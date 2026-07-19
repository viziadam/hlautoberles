import type { SendMailOptions } from 'nodemailer'
import Booking, {
  COMPLETED_BOOKING_STATUS,
  type BookingDocument,
} from '../models/Booking'
import Car from '../models/Car'
import User from '../models/User'
import * as env from '../config/env.config'
import * as logger from '../utils/logger'
import * as mailHelper from '../utils/mailHelper'

const GOOGLE_REVIEW_URL = (
  'https://g.page/r/CV_vT_F1Aw5NEBM/review'
)
const POLL_INTERVAL_MS = 15_000
const CLAIM_TIMEOUT_MS = 15 * 60_000
const MAX_BOOKINGS_PER_CYCLE = 10

type SupportedLanguage = 'hu' | 'en' | 'fr' | 'es'

interface ReviewCopy {
  subject: string
  greeting: string
  intro: string
  bookingLabel: string
  carLabel: string
  rentalPeriodLabel: string
  button: string
  privacyNote: string
  closing: string
}

const copies: Record<SupportedLanguage, ReviewCopy> = {
  hu: {
    subject: `Milyen volt a bérlésed? – ${env.WEBSITE_NAME}`,
    greeting: 'Kedves',
    intro: 'Köszönjük, hogy minket választottál. Ha elégedett voltál a bérléssel, kérjük, oszd meg tapasztalatodat a Google-on. A rövid értékelésed sokat segít másoknak a választásban és nekünk a szolgáltatás fejlesztésében.',
    bookingLabel: 'Foglalás azonosítója',
    carLabel: 'Jármű',
    rentalPeriodLabel: 'Bérlési időszak',
    button: 'Google-értékelés írása',
    privacyNote: 'Ez egy egyszeri, a befejezett bérléshez kapcsolódó visszajelzéskérés. Ugyanerre a foglalásra nem küldünk újabb véleménykérő e-mailt.',
    closing: 'Köszönjük a bizalmadat!',
  },
  en: {
    subject: `How was your rental? – ${env.WEBSITE_NAME}`,
    greeting: 'Hello',
    intro: 'Thank you for choosing us. If you were satisfied with the rental, please share your experience on Google. Your short review helps other customers and helps us improve our service.',
    bookingLabel: 'Booking ID',
    carLabel: 'Vehicle',
    rentalPeriodLabel: 'Rental period',
    button: 'Write a Google review',
    privacyNote: 'This is a one-time feedback request related to your completed rental. We will not send another review request for the same booking.',
    closing: 'Thank you for your trust!',
  },
  fr: {
    subject: `Comment s’est passée votre location ? – ${env.WEBSITE_NAME}`,
    greeting: 'Bonjour',
    intro: 'Merci de nous avoir choisis. Si vous avez été satisfait de votre location, partagez votre expérience sur Google. Votre avis aide les autres clients et nous permet d’améliorer notre service.',
    bookingLabel: 'Identifiant de réservation',
    carLabel: 'Véhicule',
    rentalPeriodLabel: 'Période de location',
    button: 'Rédiger un avis Google',
    privacyNote: 'Il s’agit d’une demande unique liée à votre location terminée. Nous n’enverrons pas une nouvelle demande pour la même réservation.',
    closing: 'Merci pour votre confiance !',
  },
  es: {
    subject: `¿Qué tal fue tu alquiler? – ${env.WEBSITE_NAME}`,
    greeting: 'Hola',
    intro: 'Gracias por elegirnos. Si quedaste satisfecho con el alquiler, comparte tu experiencia en Google. Tu reseña ayuda a otros clientes y nos permite mejorar el servicio.',
    bookingLabel: 'ID de reserva',
    carLabel: 'Vehículo',
    rentalPeriodLabel: 'Periodo de alquiler',
    button: 'Escribir una reseña en Google',
    privacyNote: 'Esta es una solicitud única relacionada con tu alquiler finalizado. No enviaremos otra solicitud para la misma reserva.',
    closing: '¡Gracias por tu confianza!',
  },
}

let timer: NodeJS.Timeout | undefined
let processing = false

const escapeHtml = (value: unknown) => String(value ?? '')
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;')

const normalizeLanguage = (language?: string): SupportedLanguage => (
  ['hu', 'en', 'fr', 'es'].includes(language || '')
    ? language as SupportedLanguage
    : 'hu'
)

const formatDate = (
  date: Date,
  language: SupportedLanguage,
) => {
  const localeByLanguage: Record<SupportedLanguage, string> = {
    hu: 'hu-HU',
    en: 'en-US',
    fr: 'fr-FR',
    es: 'es-ES',
  }

  return new Intl.DateTimeFormat(
    localeByLanguage[language],
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: env.TIMEZONE,
    },
  ).format(date)
}

const markSkipped = async (
  booking: BookingDocument,
  claimedAt: Date,
  reason: string,
) => {
  await Booking.updateOne(
    {
      _id: booking._id,
      reviewRequestClaimedAt: claimedAt,
    },
    {
      $set: {
        reviewRequestSkippedAt: new Date(),
        reviewRequestSkipReason: reason,
      },
      $unset: {
        reviewRequestClaimedAt: 1,
      },
    },
  )
}

const releaseClaim = async (
  booking: BookingDocument,
  claimedAt: Date,
) => {
  await Booking.updateOne(
    {
      _id: booking._id,
      reviewRequestClaimedAt: claimedAt,
    },
    {
      $unset: {
        reviewRequestClaimedAt: 1,
      },
    },
  )
}

const claimNextBooking = async () => {
  const now = new Date()
  const staleClaimBefore = new Date(
    now.getTime() - CLAIM_TIMEOUT_MS,
  )

  return Booking.findOneAndUpdate(
    {
      status: COMPLETED_BOOKING_STATUS,
      to: { $lte: now },
      reviewRequestSentAt: null,
      reviewRequestSkippedAt: null,
      $or: [
        { reviewRequestClaimedAt: null },
        { reviewRequestClaimedAt: { $lt: staleClaimBefore } },
      ],
    },
    {
      $set: {
        reviewRequestClaimedAt: now,
      },
    },
    {
      new: true,
      sort: { to: 1 },
    },
  ).exec()
}

const createMail = async (
  booking: BookingDocument,
): Promise<SendMailOptions | null> => {
  const driver = await User.findById(booking.driver).lean()

  if (!driver?.email) {
    return null
  }

  if (driver.enableEmailNotifications === false) {
    return null
  }

  const car = await Car.findById(booking.car).lean()
  const language = normalizeLanguage(driver.language)
  const copy = copies[language]
  const bookingId = escapeHtml(booking._id)
  const fullName = escapeHtml(driver.fullName)
  const carName = escapeHtml(car?.name || '-')
  const rentalPeriod = escapeHtml(
    `${formatDate(booking.from, language)} – ${formatDate(booking.to, language)}`,
  )

  return {
    from: env.SMTP_FROM,
    to: driver.email,
    subject: copy.subject,
    text: [
      `${copy.greeting} ${driver.fullName},`,
      '',
      copy.intro,
      '',
      `${copy.bookingLabel}: ${booking._id}`,
      `${copy.carLabel}: ${car?.name || '-'}`,
      `${copy.rentalPeriodLabel}: ${formatDate(booking.from, language)} – ${formatDate(booking.to, language)}`,
      '',
      GOOGLE_REVIEW_URL,
      '',
      copy.privacyNote,
      '',
      copy.closing,
      `${env.WEBSITE_NAME}`,
    ].join('\n'),
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1f2937;max-width:620px;margin:0 auto;">
        <p>${escapeHtml(copy.greeting)} ${fullName},</p>
        <p>${escapeHtml(copy.intro)}</p>
        <div style="background:#f5f7fa;border:1px solid #e5e7eb;padding:16px;margin:20px 0;">
          <strong>${escapeHtml(copy.bookingLabel)}:</strong> ${bookingId}<br>
          <strong>${escapeHtml(copy.carLabel)}:</strong> ${carName}<br>
          <strong>${escapeHtml(copy.rentalPeriodLabel)}:</strong> ${rentalPeriod}
        </div>
        <p style="margin:24px 0;">
          <a href="${GOOGLE_REVIEW_URL}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:#0b57d0;color:#fff;text-decoration:none;font-weight:700;padding:12px 20px;border-radius:4px;">
            ${escapeHtml(copy.button)}
          </a>
        </p>
        <p style="font-size:13px;color:#5f6368;">${escapeHtml(copy.privacyNote)}</p>
        <p>${escapeHtml(copy.closing)}<br>${escapeHtml(env.WEBSITE_NAME)}</p>
      </div>
    `,
  }
}

const processBooking = async (
  booking: BookingDocument,
) => {
  const claimedAt = booking.reviewRequestClaimedAt

  if (!claimedAt) {
    return
  }

  try {
    const driver = await User.findById(booking.driver)

    if (!driver?.email) {
      await markSkipped(
        booking,
        claimedAt,
        'missing_driver_email',
      )
      return
    }

    if (driver.enableEmailNotifications === false) {
      await markSkipped(
        booking,
        claimedAt,
        'email_notifications_disabled',
      )
      return
    }

    const mail = await createMail(booking)

    if (!mail) {
      await markSkipped(
        booking,
        claimedAt,
        'review_mail_not_available',
      )
      return
    }

    await mailHelper.sendMail(mail)

    await Booking.updateOne(
      {
        _id: booking._id,
        reviewRequestClaimedAt: claimedAt,
        reviewRequestSentAt: null,
      },
      {
        $set: {
          reviewRequestSentAt: new Date(),
        },
        $unset: {
          reviewRequestClaimedAt: 1,
          reviewRequestSkipReason: 1,
        },
      },
    )

    logger.info(
      `Google review request sent for booking ${booking._id}`,
    )
  } catch (error) {
    await releaseClaim(booking, claimedAt)
    logger.error(
      `Failed to send Google review request for booking ${booking._id}`,
      error,
    )
  }
}

const processQueue = async () => {
  if (processing) {
    return
  }

  processing = true

  try {
    for (
      let index = 0;
      index < MAX_BOOKINGS_PER_CYCLE;
      index += 1
    ) {
      const booking = await claimNextBooking()

      if (!booking) {
        break
      }

      await processBooking(booking)
    }
  } catch (error) {
    logger.error('Google review request worker failed', error)
  } finally {
    processing = false
  }
}

export const startReviewRequestWorker = () => {
  if (timer) {
    return
  }

  const initialRun = setTimeout(() => {
    void processQueue()
  }, 1_000)
  initialRun.unref()

  timer = setInterval(() => {
    void processQueue()
  }, POLL_INTERVAL_MS)
  timer.unref()

  logger.info('Google review request worker started')
}

export const stopReviewRequestWorker = () => {
  if (!timer) {
    return
  }

  clearInterval(timer)
  timer = undefined
  logger.info('Google review request worker stopped')
}
