import mongoose from 'mongoose'
import escapeStringRegexp from 'escape-string-regexp'
import { Expo, ExpoPushMessage, ExpoPushTicket } from 'expo-server-sdk'
import { Request, Response } from 'express'
import nodemailer from 'nodemailer'
import path from 'node:path'
import asyncFs from 'node:fs/promises'
import * as bookcarsTypes from ':bookcars-types'
import i18n from '../lang/i18n'
import Booking from '../models/Booking'
import User from '../models/User'
import Token from '../models/Token'
import Car from '../models/Car'
import Notification from '../models/Notification'
import NotificationCounter from '../models/NotificationCounter'
import PushToken from '../models/PushToken'
import * as helper from '../utils/helper'
import * as mailHelper from '../utils/mailHelper'
import * as env from '../config/env.config'
import * as logger from '../utils/logger'
// import stripeAPI from '../payment/stripe'


/**
 * Create a Booking.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const create = async (req: Request, res: Response) => {
  try {
    const { body }: { body: bookcarsTypes.UpsertBookingPayload } = req

    const { car, from, to, status } = body.booking

    const nextCarId = new mongoose.Types.ObjectId(car as string)
    const nextFrom = new Date(from)
    const nextTo = new Date(to)

    if (Number.isNaN(nextFrom.getTime()) || Number.isNaN(nextTo.getTime()) || nextFrom >= nextTo) {
      res.status(400).send('Invalid date range')
      return
    }

    // amelyek blokkolják az adott időszakot
    const blockingStatuses = [
      // bookcarsTypes.BookingStatus.Paid,
      bookcarsTypes.BookingStatus.Reserved,
      // bookcarsTypes.BookingStatus.Deposit,
      bookcarsTypes.BookingStatus.Pending,
    ]

    // Ha a létrehozandó booking státusza eleve nem blokkoló (pl. Cancelled),
    // akkor is érdemes tiltani, ha másik blokkoló booking ütközik.
    const conflict = await Booking.exists({
      car: nextCarId,
      status: { $in: blockingStatuses },

      // overlap: other.from < nextTo AND other.to > nextFrom
      from: { $lt: nextTo },
      to: { $gt: nextFrom },
    })

    if (conflict) {
      res.status(409).send('Car is already booked in the selected period')
      return
    }

    // opcionális: ha Car.available=false esetén se lehessen foglalni
    // const carDoc = await Car.findById(nextCarId).select('available').lean()
    // if (!carDoc || carDoc.available !== true) {
    //   res.status(409).send('Car is unavailable')
    //   return
    // }

    const booking = new Booking(body.booking)

    await booking.save()
    await notifyDriver(booking, {type: 'created' } )
    res.json(booking)
  } catch (err) {
    logger.error(`[booking.create] ${i18n.t('DB_ERROR')} ${JSON.stringify(req.body)}`, err)
    res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}


/**
 * Notify a supplier or admin.
 *
 * @async
 * @param {env.User} driver
 * @param {string} bookingId
 * @param {env.User} user
 * @param {boolean} notificationMessage
 * @returns {void}
 */
export const notify = async (driver: env.User, bookingId: string, user: env.User, notificationMessage: string) => {
  i18n.locale = user.language

  // notification
  const message = `${driver.fullName} ${notificationMessage} ${bookingId}.`
  const notification = new Notification({
    user: user._id,
    message,
    booking: bookingId,
  })

  await notification.save()
  let counter = await NotificationCounter.findOne({ user: user._id })
  if (counter && typeof counter.count !== 'undefined') {
    counter.count += 1
    await counter.save()
  } else {
    counter = new NotificationCounter({ user: user._id, count: 1 })
    await counter.save()
  }

  // mail
  // if (user.enableEmailNotifications) {
    // const adminLink = helper.joinURL(env.ADMIN_HOST, `update-booking?b=${bookingId}`)

    const mailOptions: nodemailer.SendMailOptions = {
      from: env.SMTP_FROM,
      to: user.email,
      subject: `${i18n.t('BOOKING_REQUEST_SUBJECT')} ${bookingId}`,
      html: `<p>
        ${i18n.t('HELLO')}${user.fullName},<br><br>

        ${i18n.t('BOOKING_REQUEST_ADMIN_INTRO')}<br><br>

        <strong>${i18n.t('BOOKING_ID')}:</strong> ${bookingId}<br>
        <strong>${i18n.t('BOOKING_STATUS')}:</strong> ${i18n.t('BOOKING_STATUS_PENDING')}<br>
        <strong>${i18n.t('REQUESTED_BY')}:</strong> ${driver.fullName}<br><br>

        ${i18n.t('BOOKING_REQUEST_ADMIN_ACTION')}<br><br>

        ${i18n.t('REGARDS')}<br>
      </p>`,
    }
    // <a href="${adminLink}">${i18n.t('OPEN_IN_ADMIN')}</a><br><br>

    await mailHelper.sendMail(mailOptions)
  }
// }

/**
 * Send checkout confirmation email to driver.
 *
 * @async
 * @param {env.User} user
 * @param {env.Booking} booking
 * @param {boolean} payLater
 * @returns {unknown}
 */
export const confirm = async (user: env.User, booking: env.Booking) => {
  const { language } = user
  const locale = language === 'fr' ? 'fr-FR' : 'en-US'
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    year: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: env.TIMEZONE,
  }
  const from = booking.from.toLocaleString(locale, options)
  const to = booking.to.toLocaleString(locale, options)
  const car = await Car.findById(booking.car)
  if (!car) {
    logger.info(`Car ${booking.car} not found`)
    return false
  }
  
  // let contractFile: string | null = null
  // if (supplier.contracts && supplier.contracts.length > 0) {
  //   contractFile = supplier.contracts.find((c) => c.language === user.language)?.file || null
  //   if (!contractFile) {
  //     contractFile = supplier.contracts.find((c) => c.language === 'en')?.file || null
  //   }
  // }

  const detailsUrl = helper.joinURL(env.FRONTEND_HOST, `booking?b=${booking._id}`)

  // const mailOptions: nodemailer.SendMailOptions = {
  //   from: env.SMTP_FROM,
  //   to: user.email,
  //   subject: `${i18n.t('BOOKING_CONFIRMED_SUBJECT_PART1')} ${booking._id} ${i18n.t('BOOKING_CONFIRMED_SUBJECT_PART2')}`,
  //   html:
  //     `<p>
  //       ${i18n.t('HELLO')}${user.fullName},<br><br>
  //       ${!payLater ? `${i18n.t('BOOKING_CONFIRMED_PART1')} ${booking._id} ${i18n.t('BOOKING_CONFIRMED_PART2')}`
  //       + '<br><br>' : ''}
  //       ${i18n.t('BOOKING_CONFIRMED_PART3')}${car.supplier.fullName}${i18n.t('BOOKING_CONFIRMED_PART4')}${i18n.t('BOOKING_CONFIRMED_PART5')}`
  //     + `${from} ${i18n.t('BOOKING_CONFIRMED_PART6')}`
  //     + `${car.name}${i18n.t('BOOKING_CONFIRMED_PART7')}`
  //     + `<br><br>${i18n.t('BOOKING_CONFIRMED_PART8')}<br><br>`
  //     + `${i18n.t('BOOKING_CONFIRMED_PART9')}${car.supplier.fullName}${i18n.t('BOOKING_CONFIRMED_PART10')}${i18n.t('BOOKING_CONFIRMED_PART11')}`
  //     + `${to} ${i18n.t('BOOKING_CONFIRMED_PART12')}`
  //     + `<br><br>${i18n.t('BOOKING_CONFIRMED_PART13')}<br><br>${i18n.t('BOOKING_CONFIRMED_PART14')}${env.FRONTEND_HOST}<br><br>
  //       ${i18n.t('REGARDS')}<br>
  //       </p>`,
  // }

  const mailOptions: nodemailer.SendMailOptions = {
    from: env.SMTP_FROM,
    to: user.email,
    subject: `${i18n.t('BOOKING_REQUEST_RECEIVED_SUBJECT')} ${booking._id}`,
    html: `<p>
      ${i18n.t('HELLO')}${user.fullName},<br><br>

      ${i18n.t('BOOKING_REQUEST_RECEIVED_INTRO')}<br><br>

      <strong>${i18n.t('BOOKING_ID')}:</strong> ${booking._id}<br>
      <strong>${i18n.t('BOOKING_STATUS')}:</strong> ${i18n.t('BOOKING_STATUS_PENDING')}<br>
      <strong>${i18n.t('CAR')}:</strong> ${car.name}<br>
      <strong>${i18n.t('FROM')}:</strong> ${from}<br>
      <strong>${i18n.t('TO')}:</strong> ${to}<br><br>

      ${i18n.t('BOOKING_REQUEST_RECEIVED_NEXT_STEPS')}<br><br>

      ${i18n.t('REGARDS')}<br>
      ${i18n.t('COMPANY')}<br>
    </p>`,
  }
  // <a href="${detailsUrl}">${i18n.t('VIEW_BOOKING')}</a><br><br>


  // if (contractFile) {
  //   const file = path.join(env.CDN_CONTRACTS, contractFile)
  //   if (await helper.pathExists(file)) {
  //     mailOptions.attachments = [{ path: file }]
  //   }
  // }

  await mailHelper.sendMail(mailOptions)

  return true
}

/**
 * Complete checkout process and create Booking.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const checkout = async (req: Request, res: Response) => {
  try {
    let user: env.User | null
    const { body }: { body: bookcarsTypes.CheckoutPayload } = req
    const { driver } = body

    if (!body.booking) {
      throw new Error('Booking not found')
    }

    

    // if (driver) {
    //   driver.verified = false
    //   driver.blacklisted = false
    //   driver.type = bookcarsTypes.UserType.User
    //   driver.license = null

    //   user = new User(driver)
    //   await user.save()

    //   const token = new Token({ user: user._id, token: helper.generateToken() })
    //   await token.save()

    //   i18n.locale = user.language

    //   const mailOptions: nodemailer.SendMailOptions = {
    //     from: env.SMTP_FROM,
    //     to: user.email,
    //     subject: i18n.t('ACCOUNT_ACTIVATION_SUBJECT'),
    //     html: `<p>
    //     ${i18n.t('HELLO')}${user.fullName},<br><br>
    //     ${i18n.t('ACCOUNT_ACTIVATION_LINK')}<br><br>
    //     ${helper.joinURL(env.FRONTEND_HOST, 'activate')}/?u=${encodeURIComponent(user.id)}&e=${encodeURIComponent(user.email)}&t=${encodeURIComponent(token.token)}<br><br>
    //     ${i18n.t('REGARDS')}<br>
    //     </p>`,
    //   }
    //   await mailHelper.sendMail(mailOptions)

    //   body.booking.driver = user.id
    // } else {
    //   user = await User.findById(body.booking.driver)
    // }

    user = await User.findById(body.booking.driver)

    if (!user) {
      throw new Error(`User ${body.booking.driver} not found`)
    }

    const { language } = user
    i18n.locale = language

   

    const booking = new Booking(body.booking)

    await booking.save()


    const admin = !!env.ADMIN_EMAIL && (await User.findOne({ email: env.ADMIN_EMAIL, type: bookcarsTypes.UserType.Admin }))
      if (admin) {
        i18n.locale = admin.language
        const message = i18n.t('BOOKING_PENDING_NOTIFICATION') 
        await notify(user, booking.id, admin, message)
      }

    if (!(await confirm(user, booking))) {
        res.sendStatus(400)
        return
      }

    // if (body.payLater || (booking.status === bookcarsTypes.BookingStatus.Paid && body.paymentIntentId && body.customerId)) {
    //   // Mark car as fully booked
    //   // if (env.MARK_CAR_AS_FULLY_BOOKED_ON_CHECKOUT) {
    //   //   await Car.updateOne({ _id: booking.car }, { fullyBooked: false })
    //   // }

    //   // Send confirmation email to customer
    //   if (!(await confirm(user, supplier, booking, body.payLater))) {
    //     res.sendStatus(400)
    //     return
    //   }

    //   // Notify supplier
    //   i18n.locale = supplier.language
    //   let message = body.payLater ? i18n.t('BOOKING_PAY_LATER_NOTIFICATION') : i18n.t('BOOKING_PAID_NOTIFICATION')
    //   await notify(user, booking.id, supplier, message)

    //   // Notify admin
    //   const admin = !!env.ADMIN_EMAIL && (await User.findOne({ email: env.ADMIN_EMAIL, type: bookcarsTypes.UserType.Admin }))
    //   if (admin) {
    //     i18n.locale = admin.language
    //     message = body.payLater ? i18n.t('BOOKING_PAY_LATER_NOTIFICATION') : i18n.t('BOOKING_PAID_NOTIFICATION')
    //     await notify(user, booking.id, admin, message)
    //   }
    // }

    res.status(200).send({ bookingId: booking.id })
  } catch (err) {
    logger.error(`[booking.checkout] ${i18n.t('ERROR')}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
  }
}

// export const checkout = async (req: Request, res: Response) => {
//   try {
//     let user = null
//     const { body } = req // CheckoutPayload
//     const { driver } = body

//     if (!body.booking) {
//       throw new Error('Booking not found')
//     }

//     // const supplier = await User.findById(body.booking.supplier)
//     // if (!supplier) {
//     //   throw new Error(`Supplier ${body.booking.supplier} not found`)
//     // }

//     // 1) Guest driver létrehozás + license mozgatás + activation email (meglévő logika)
//     if (driver) {
//       // const { license } = driver
//       // if (supplier.licenseRequired && !license) {
//       //   throw new Error("Driver's license required")
//       // }
//       // if (supplier.licenseRequired && !(await helper.pathExists(path.join(env.CDN_TEMP_LICENSES, license!)))) {
//       //   throw new Error("Driver's license file not found")
//       // }

//       driver.verified = false
//       driver.blacklisted = false
//       driver.type = bookcarsTypes.UserType.User
//       driver.license = null

//       user = new User(driver)
//       await user.save()

//       // create license (átmozgatás tempből)
//       // if (license) {
//       //   const tempLicense = path.join(env.CDN_TEMP_LICENSES, license)
//       //   const filename = `${user.id}${path.extname(tempLicense)}`
//       //   const filepath = path.join(env.CDN_LICENSES, filename)
//       //   await asyncFs.rename(tempLicense, filepath)
//       //   user.license = filename
//       //   await user.save()
//       // }

//       // activation token + email
//       const token = new Token({ user: user._id, token: helper.generateToken() })
//       await token.save()

//       i18n.locale = user.language
//       await mailHelper.sendMail({
//         from: env.SMTP_FROM,
//         to: user.email,
//         subject: i18n.t('ACCOUNT_ACTIVATION_SUBJECT'),
//         html: `<p>
//           ${i18n.t('HELLO')}${user.fullName},<br><br>
//           ${i18n.t('ACCOUNT_ACTIVATION_LINK')}<br><br>
//           ${helper.joinURL(env.FRONTEND_HOST, 'activate')}/?u=${encodeURIComponent(user.id)}&e=${encodeURIComponent(user.email)}&t=${encodeURIComponent(token.token)}<br><br>
//           ${i18n.t('REGARDS')}<br>
//         </p>`,
//       })

//       body.booking.driver = user.id
//     } else {
//       user = await User.findById(body.booking.driver)
//     }

//     if (!user) {
//       throw new Error(`User ${body.booking.driver} not found`)
//     }

//     // // license ellenőrzés userre is
//     // if (supplier.licenseRequired && !user.license) {
//     //   throw new Error("Driver's license required")
//     // }
//     // if (supplier.licenseRequired && !(await helper.pathExists(path.join(env.CDN_LICENSES, user.license!)))) {
//     //   throw new Error("Driver's license file not found")
//     // }

//     // 2) Additional driver mentése (meglévő logika)
//     if (body.booking.additionalDriver && body.additionalDriver) {
//       const additionalDriver = new AdditionalDriver(body.additionalDriver)
//       await additionalDriver.save()
//       body.booking._additionalDriver = additionalDriver._id.toString()
//     }

//     // 3) Fizetés KIHAGYVA: sessionId/paymentIntentId/customerId/payPal ignore
//     // 4) Foglalás státusz: igény beérkezett
//     body.booking.status = bookcarsTypes.BookingStatus.Pending
//     body.booking.expireAt = null
//     body.booking.sessionId = undefined
//     body.booking.paymentIntentId = undefined
//     body.booking.customerId = undefined

//     const booking = new Booking(body.booking)
//     await booking.save()

//     // 5) Audit log (naplózás)
//     await audit({
//       entity: 'Booking',
//       entityId: booking.id,
//       action: 'REQUEST_CREATED',
//       actorType: 'CUSTOMER',
//       actorId: user.id,
//       meta: {
//         supplierId: String(booking.supplier),
//         carId: String(booking.car),
//         from: booking.from,
//         to: booking.to,
//         price: booking.price,
//       },
//     })

//     // 6) Email a drivernek: "igény rögzítve"
//     // A meglévő confirm(..., payLater=true) jó kompromisszum most:
//     if (!(await confirm(user, booking, true))) {
//       res.sendStatus(400)
//       return
//     }
//     await audit({
//       entity: 'Booking',
//       entityId: booking.id,
//       action: 'EMAIL_SENT_TO_CUSTOMER',
//       actorType: 'SYSTEM',
//       actorId: null,
//       meta: { template: 'confirm(payLater=true)' },
//     })

//     // 7) Értesítés supplier + admin
//     // i18n.locale = supplier.language
//     const message = i18n.t('BOOKING_PAY_LATER_NOTIFICATION') // új kulcsot is írhatsz később: BOOKING_REQUEST_NOTIFICATION
//     await notify(user, booking.id, user,  message)
//     await audit({
//       entity: 'Booking',
//       entityId: booking.id,
//       action: 'NOTIFIED_SUPPLIER',
//       actorType: 'SYSTEM',
//       actorId: null,
//       // meta: { supplierId: supplier.id },
//     })

//     const admin = !!env.ADMIN_EMAIL && (await User.findOne({ email: env.ADMIN_EMAIL, type: bookcarsTypes.UserType.Admin }))
//     if (admin) {
//       i18n.locale = admin.language
//       await notify(user, booking.id, admin, message)
//       await audit({
//         entity: 'Booking',
//         entityId: booking.id,
//         action: 'NOTIFIED_ADMIN',
//         actorType: 'SYSTEM',
//         actorId: null,
//         meta: { adminId: admin.id },
//       })
//     }

//     res.status(200).send({ bookingId: booking.id })
//   } catch (err) {
//     logger.error(`[booking.checkout] ${i18n.t('ERROR')}`, err)
//     res.status(400).send(i18n.t('ERROR') + err)
//   }
// }

type BookingNotifyEvent =
  | { type: 'created' }
  | { type: 'status_changed'; previousStatus: bookcarsTypes.BookingStatus }

  const statusKey = (status: bookcarsTypes.BookingStatus) =>
  `BOOKING_STATUS_${String(status).toUpperCase()}`

/**
 * Notify driver and send push notification.
 *
 * @async
 * @param {env.Booking} booking
 * @returns {void}
 */
const notifyDriver = async (booking: env.Booking, event: BookingNotifyEvent) => {
  const driver = await User.findById(booking.driver)
  if (!driver) {
    logger.info(`Driver ${booking.driver} not found`)
    return
  }

  i18n.locale = driver.language

  let message: string

if (event.type === 'created') {
  message = `${i18n.t('BOOKING_CREATED_NOTIFICATION_PART1')} ${booking._id} ${i18n.t('BOOKING_CREATED_NOTIFICATION_PART2')}`
} else {
  const fromLabel = i18n.t(statusKey(event.previousStatus))
  const toLabel = i18n.t(statusKey(booking.status))

  message =
    `${i18n.t('BOOKING_STATUS_CHANGED_NOTIFICATION_PART1')} ${booking._id} ` +
    `${i18n.t('BOOKING_STATUS_CHANGED_NOTIFICATION_PART2')} ${fromLabel} ` +
    `${i18n.t('BOOKING_STATUS_CHANGED_NOTIFICATION_PART3')} ${toLabel}.`
}

  // const message = `${i18n.t('BOOKING_UPDATED_NOTIFICATION_PART1')} ${booking._id} 
  // ${i18n.t('BOOKING_UPDATED_NOTIFICATION_PART2')}`
  const notification = new Notification({
    user: driver._id,
    message,
    booking: booking._id,
  })
  await notification.save()

  let counter = await NotificationCounter.findOne({ user: driver._id })
  if (counter && typeof counter.count !== 'undefined') {
    counter.count += 1
    await counter.save()
  } else {
    counter = new NotificationCounter({ user: driver._id, count: 1 })
    await counter.save()
  }

  // mail
  if (driver.enableEmailNotifications) {
    const mailOptions: nodemailer.SendMailOptions = {
      from: env.SMTP_FROM,
      to: driver.email,
      subject: message,
      html: `<p>
    ${i18n.t('HELLO')}${driver.fullName},<br><br>
    ${message}<br><br>
    ${helper.joinURL(env.FRONTEND_HOST, `booking?b=${booking._id}`)}<br><br>
    ${i18n.t('REGARDS')}<br>
    </p>`,
    }
    await mailHelper.sendMail(mailOptions)
  }

  // push notification
  const pushToken = await PushToken.findOne({ user: driver._id })
  if (pushToken) {
    const { token } = pushToken
    const expo = new Expo({ accessToken: env.EXPO_ACCESS_TOKEN, useFcmV1: true })

    if (!Expo.isExpoPushToken(token)) {
      logger.info(`Push token ${token} is not a valid Expo push token.`)
      return
    }

    const messages: ExpoPushMessage[] = [
      {
        to: token,
        sound: 'default',
        body: message,
        data: {
          user: driver._id,
          notification: notification._id,
          booking: booking._id,
        },
      },
    ]

    // The Expo push notification service accepts batches of notifications so
    // that you don't need to send 1000 requests to send 1000 notifications. We
    // recommend you batch your notifications to reduce the number of requests
    // and to compress them (notifications with similar content will get
    // compressed).
    const chunks = expo.chunkPushNotifications(messages)
    const tickets: ExpoPushTicket[] = [];

    (async () => {
      // Send the chunks to the Expo push notification service. There are
      // different strategies you could use. A simple one is to send one chunk at a
      // time, which nicely spreads the load out over time:
      for (const chunk of chunks) {
        try {
          const ticketChunks = await expo.sendPushNotificationsAsync(chunk)

          tickets.push(...ticketChunks)

          // NOTE: If a ticket contains an error code in ticket.details.error, you
          // must handle it appropriately. The error codes are listed in the Expo
          // documentation:
          // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
          for (const ticketChunk of ticketChunks) {
            if (ticketChunk.status === 'ok') {
              logger.info(`Push notification sent: ${ticketChunk.id}`)
            } else {
              throw new Error(ticketChunk.message)
            }
          }
        } catch (error) {
          logger.error('Error while sending push notification', error)
        }
      }
    })()
  }
}

/**
 * Update Booking.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const update = async (req: Request, res: Response) => {
  try {
    const { body }: { body: bookcarsTypes.UpsertBookingPayload } = req
    const booking = await Booking.findById(body.booking._id)

    if (booking) {
      
      const {
        car,
        driver,
        from,
        to,
        status,
        cancellation,
        amendments,
        theftProtection,
        collisionDamageWaiver,
        fullInsurance,
        additionalDriver,
        price,
        isDeposit,
        isPayedInFull
      } = body.booking

      const previousStatus = booking.status

      booking.car = new mongoose.Types.ObjectId(car as string)
      booking.driver = new mongoose.Types.ObjectId(driver as string)
      booking.from = from
      booking.to = to
      booking.status = status
      booking.cancellation = cancellation
      booking.amendments = amendments
      booking.theftProtection = theftProtection
      booking.collisionDamageWaiver = collisionDamageWaiver
      booking.fullInsurance = fullInsurance
      booking.price = price as number
      booking.isDeposit = isDeposit || false
      booking.isPayedInFull = isPayedInFull || false

      // ide, az update logikába, a booking.save() elé:
const nextCarId = new mongoose.Types.ObjectId(car as string)
const nextFrom = new Date(from)
const nextTo = new Date(to)

// ha hibás dátumot kapnál:
if (Number.isNaN(nextFrom.getTime()) || Number.isNaN(nextTo.getTime()) || nextFrom >= nextTo) {
  res.status(400).send('Invalid date range')
  return
}

// azok a státuszok, amik blokkolják a kocsit
const blockingStatuses = [
  // bookcarsTypes.BookingStatus.Paid,
  bookcarsTypes.BookingStatus.Reserved,
  // bookcarsTypes.BookingStatus.Deposit,
  bookcarsTypes.BookingStatus.Pending,
]

// Keresünk olyan MÁS bookingot, ami átfed és ugyanarra a kocsira szól
const conflict = await Booking.exists({
  _id: { $ne: booking._id },        // kizárjuk a saját foglalást
  car: nextCarId,
  status: { $in: blockingStatuses },

  // overlap: other.from < nextTo AND other.to > nextFrom
  from: { $lt: nextTo },
  to: { $gt: nextFrom },
})

if (conflict) {
  res.status(409).send('Car is already booked in the selected period')
  return
}

      await booking.save()

      if (previousStatus !== status) {
        // notify driver
        await notifyDriver(booking, { type: 'status_changed', previousStatus: previousStatus })
      }

      res.json(booking)
      return
    }

    logger.error('[booking.update] Booking not found:', body.booking._id)
    res.sendStatus(204)
  } catch (err) {
    logger.error(`[booking.update] ${i18n.t('DB_ERROR')} ${JSON.stringify(req.body)}`, err)
    res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Update Booking Status.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const updateStatus = async (req: Request, res: Response) => {
  try {
    const { body }: { body: bookcarsTypes.UpdateStatusPayload } = req
    const { ids: _ids, status } = body
    const ids = _ids.map((id) => new mongoose.Types.ObjectId(id))
    const bulk = Booking.collection.initializeOrderedBulkOp()
    const bookings = await Booking.find({ _id: { $in: ids } })

    bulk.find({ _id: { $in: ids } }).update({ $set: { status } })
    await bulk.execute()

    for (const booking of bookings) {
      if (booking.status !== status) {
        await notifyDriver(booking, { type: 'status_changed', previousStatus: status as bookcarsTypes.BookingStatus })
      }
    }

    res.sendStatus(200)
  } catch (err) {
    logger.error(`[booking.updateStatus] ${i18n.t('DB_ERROR')} ${JSON.stringify(req.body)}`, err)
    res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Delete Bookings.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const deleteBookings = async (req: Request, res: Response) => {
  try {
    const { body }: { body: string[] } = req
    const ids = body.map((id) => new mongoose.Types.ObjectId(id))
    const bookings = await Booking.find({
      _id: { $in: ids },
      additionalDriver: true,
      _additionalDriver: { $ne: null },
    })

    await Booking.deleteMany({ _id: { $in: ids } })
    // const additionalDivers = bookings.map((booking) => new mongoose.Types.ObjectId(booking._additionalDriver))
    // await AdditionalDriver.deleteMany({ _id: { $in: additionalDivers } })

    res.sendStatus(200)
  } catch (err) {
    logger.error(`[booking.deleteBookings] ${i18n.t('DB_ERROR')} ${JSON.stringify(req.body)}`, err)
    res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Delete temporary Booking created from checkout session.
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const deleteTempBooking = async (req: Request, res: Response) => {
  const { bookingId, sessionId } = req.params

  try {
    const booking = await Booking.findOne({ _id: bookingId, sessionId, status: bookcarsTypes.BookingStatus.Void, expireAt: { $ne: null } })
    if (booking) {
      const user = await User.findOne({ _id: booking.driver, verified: false, expireAt: { $ne: null } })
      await user?.deleteOne()
    }
    await booking?.deleteOne()
    res.sendStatus(200)
  } catch (err) {
    logger.error(`[booking.deleteTempBooking] ${i18n.t('DB_ERROR')} ${JSON.stringify({ bookingId, sessionId })}`, err)
    res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Get Booking by ID.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const getBooking = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const booking = await Booking.findById(id)
      .populate<{ car: env.CarInfo }>('car')        // keep if you still store booking.car as ObjectId
      .populate<{ driver: env.User }>('driver')    // keep if you still store booking.driver as ObjectId
      .lean()

    if (booking) {

      res.json(booking)
      return
    }

    logger.error('[booking.getBooking] Booking not found:', id)
    res.sendStatus(204)
  } catch (err) {
    logger.error(`[booking.getBooking] ${i18n.t('DB_ERROR')} ${id}`, err)
    res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Get Booking by sessionId.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const getBookingId = async (req: Request, res: Response) => {
  const { sessionId } = req.params

  try {
    const booking = await Booking.findOne({ sessionId })

    if (!booking) {
      logger.error('[booking.getBookingId] Booking not found (sessionId):', sessionId)
      res.sendStatus(204)
      return
    }
    res.json(booking?.id)
  } catch (err) {
    logger.error(`[booking.getBookingId] (sessionId) ${i18n.t('DB_ERROR')} ${sessionId}`, err)
    res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Get Bookings.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
// export const getBookings = async (req: Request, res: Response) => {
//   try {
//     const { body }: { body: bookcarsTypes.GetBookingsPayload } = req
//     const page = Number.parseInt(req.params.page, 10)
//     const size = Number.parseInt(req.params.size, 10)
//     // const suppliers = body.suppliers??.map((id) => new mongoose.Types.ObjectId(id))
//     const {
//       statuses,
//       user,
//       car,
//     } = body
//     const from = (body.filter && body.filter.from && new Date(body.filter.from)) || null
//     const dateBetween = (body.filter && body.filter.dateBetween && new Date(body.filter.dateBetween)) || null
//     const to = (body.filter && body.filter.to && new Date(body.filter.to)) || null
//     const pickupLocation = (body.filter && body.filter.pickupLocation) || null
//     const dropOffLocation = (body.filter && body.filter.dropOffLocation) || null
//     let keyword = (body.filter && body.filter.keyword) || ''
//     const options = 'i'

//     const $match: mongoose.FilterQuery<any> = {
//       $and: [{ 'supplier._id': { $in: suppliers } }, { status: { $in: statuses } }, { expireAt: null }],
//     }

//     if (user) {
//       $match.$and!.push({ 'driver._id': { $eq: new mongoose.Types.ObjectId(user) } })
//     }
//     if (car) {
//       $match.$and!.push({ 'car._id': { $eq: new mongoose.Types.ObjectId(car) } })
//     }

//     if (dateBetween) {
//       const dateBetweenStart = new Date(dateBetween)
//       dateBetweenStart.setHours(0, 0, 0, 0)
//       const dateBetweenEnd = new Date(dateBetween)
//       dateBetweenEnd.setHours(23, 59, 59, 999)

//       $match.$and!.push({
//         $and: [
//           { from: { $lte: dateBetweenEnd } },
//           { to: { $gte: dateBetweenStart } },
//         ],
//       })
//     } else if (from) {
//       $match.$and!.push({ from: { $gte: from } }) // $from >= from
//     }

//     if (to) {
//       $match.$and!.push({ to: { $lte: to } })// $to < to
//     }
//     if (pickupLocation) {
//       $match.$and!.push({ 'pickupLocation._id': { $eq: new mongoose.Types.ObjectId(pickupLocation) } })
//     }
//     if (dropOffLocation) {
//       $match.$and!.push({ 'dropOffLocation._id': { $eq: new mongoose.Types.ObjectId(dropOffLocation) } })
//     }
//     if (keyword) {
//       const isObjectId = helper.isValidObjectId(keyword)
//       if (isObjectId) {
//         $match.$and!.push({
//           _id: { $eq: new mongoose.Types.ObjectId(keyword) },
//         })
//       } else {
//         keyword = escapeStringRegexp(keyword)
//         $match.$and!.push({
//           $or: [
//             { 'supplier.fullName': { $regex: keyword, $options: options } },
//             { 'driver.fullName': { $regex: keyword, $options: options } },
//             { 'car.name': { $regex: keyword, $options: options } },
//           ],
//         })
//       }
//     }

//     const { language } = req.params

//     const data = await Booking.aggregate([
//       {
//         $lookup: {
//           from: 'User',
//           let: { supplierId: '$supplier' },
//           pipeline: [
//             {
//               $match: { $expr: { $eq: ['$_id', '$$supplierId'] } },
//             },
//           ],
//           as: 'supplier',
//         },
//       },
//       { $unwind: { path: '$supplier', preserveNullAndEmptyArrays: false } },
//       {
//         $lookup: {
//           from: 'Car',
//           let: { carId: '$car' },
//           pipeline: [
//             {
//               $match: { $expr: { $eq: ['$_id', '$$carId'] } },
//             },
//           ],
//           as: 'car',
//         },
//       },
//       { $unwind: { path: '$car', preserveNullAndEmptyArrays: false } },
//       {
//         $lookup: {
//           from: 'User',
//           let: { driverId: '$driver' },
//           pipeline: [
//             {
//               $match: { $expr: { $eq: ['$_id', '$$driverId'] } },
//             },
//           ],
//           as: 'driver',
//         },
//       },
//       { $unwind: { path: '$driver', preserveNullAndEmptyArrays: false } },
//       {
//         $lookup: {
//           from: 'Location',
//           let: { pickupLocationId: '$pickupLocation' },
//           pipeline: [
//             {
//               $match: { $expr: { $eq: ['$_id', '$$pickupLocationId'] } },
//             },
//             {
//               $lookup: {
//                 from: 'LocationValue',
//                 let: { values: '$values' },
//                 pipeline: [
//                   {
//                     $match: {
//                       $and: [{ $expr: { $in: ['$_id', '$$values'] } }, { $expr: { $eq: ['$language', language] } }],
//                     },
//                   },
//                 ],
//                 as: 'value',
//               },
//             },
//             {
//               $addFields: { name: '$value.value' },
//             },
//           ],
//           as: 'pickupLocation',
//         },
//       },
//       {
//         $unwind: { path: '$pickupLocation', preserveNullAndEmptyArrays: false },
//       },
//       {
//         $lookup: {
//           from: 'Location',
//           let: { dropOffLocationId: '$dropOffLocation' },
//           pipeline: [
//             {
//               $match: { $expr: { $eq: ['$_id', '$$dropOffLocationId'] } },
//             },
//             {
//               $lookup: {
//                 from: 'LocationValue',
//                 let: { values: '$values' },
//                 pipeline: [
//                   {
//                     $match: {
//                       $and: [{ $expr: { $in: ['$_id', '$$values'] } }, { $expr: { $eq: ['$language', language] } }],
//                     },
//                   },
//                 ],
//                 as: 'value',
//               },
//             },
//             {
//               $addFields: { name: '$value.value' },
//             },
//           ],
//           as: 'dropOffLocation',
//         },
//       },
//       {
//         $unwind: {
//           path: '$dropOffLocation',
//           preserveNullAndEmptyArrays: false,
//         },
//       },
//       {
//         $match,
//       },
//       {
//         $facet: {
//           resultData: [{ $sort: { createdAt: -1, _id: 1 } }, { $skip: (page - 1) * size }, { $limit: size }],
//           pageInfo: [
//             {
//               $count: 'totalRecords',
//             },
//           ],
//         },
//       },
//     ])

//     const bookings: env.BookingInfo[] = data[0].resultData

//     for (const booking of bookings) {
//       const { _id, fullName, avatar, priceChangeRate } = booking.supplier
//       booking.supplier = { _id, fullName, avatar, priceChangeRate }
//     }

//     res.json(data)
//   } catch (err) {
//     logger.error(`[booking.getBookings] ${i18n.t('DB_ERROR')} ${JSON.stringify(req.body)}`, err)
//     res.status(400).send(i18n.t('DB_ERROR') + err)
//   }
// }

export const getBookings = async (req: Request, res: Response) => {
  try {
    const { body }: { body: bookcarsTypes.GetBookingsPayload } = req
    const page = Number.parseInt(req.params.page, 10)
    const size = Number.parseInt(req.params.size, 10)

    const { statuses, user, car } = body

    const from = (body.filter && body.filter.from && new Date(body.filter.from)) || null
    const dateBetween = (body.filter && body.filter.dateBetween && new Date(body.filter.dateBetween)) || null
    const to = (body.filter && body.filter.to && new Date(body.filter.to)) || null

    // If you truly removed these from your system, ignore them:
    // const pickupLocation = body.filter?.pickupLocation || null
    // const dropOffLocation = body.filter?.dropOffLocation || null

    let keyword = (body.filter && body.filter.keyword) || ''
    const options = 'i'

    // IMPORTANT: match on Booking fields only (no supplier/location object paths)
    const $match: mongoose.FilterQuery<any> = {
      $and: [
        { expireAt: null },
        { status: { $in: statuses } }, // if statuses can be empty, guard it (see note below)
      ],
    }

    if (user) {
      $match.$and!.push({ driver: { $eq: new mongoose.Types.ObjectId(user) } })
    }

    if (car) {
      $match.$and!.push({ car: { $eq: new mongoose.Types.ObjectId(car) } })
    }

    if (dateBetween) {
      const dateBetweenStart = new Date(dateBetween)
      dateBetweenStart.setHours(0, 0, 0, 0)
      const dateBetweenEnd = new Date(dateBetween)
      dateBetweenEnd.setHours(23, 59, 59, 999)

      $match.$and!.push({
        $and: [{ from: { $lte: dateBetweenEnd } }, { to: { $gte: dateBetweenStart } }],
      })
    } else if (from) {
      $match.$and!.push({ from: { $gte: from } })
    }

    if (to) {
      $match.$and!.push({ to: { $lte: to } })
    }

    // Keyword:
    // - if ObjectId -> booking _id match
    // - else -> search in joined driver.fullName OR car.name (supplier removed)
    const keywordIsObjectId = keyword && helper.isValidObjectId(keyword)
    const keywordRegex = keyword && !keywordIsObjectId ? escapeStringRegexp(keyword) : ''

    const data = await Booking.aggregate([
      { $match },

      // join car (keep if UI needs car name or you want keyword search by car name)
      {
        $lookup: {
          from: 'Car',
          let: { carId: '$car' },
          pipeline: [{ $match: { $expr: { $eq: ['$_id', '$$carId'] } } }],
          as: 'car',
        },
      },
      { $unwind: { path: '$car', preserveNullAndEmptyArrays: true } },

      // join driver (keep if UI needs driver name or you want keyword search by driver name)
      {
        $lookup: {
          from: 'User',
          let: { driverId: '$driver' },
          pipeline: [{ $match: { $expr: { $eq: ['$_id', '$$driverId'] } } }],
          as: 'driver',
        },
      },
      { $unwind: { path: '$driver', preserveNullAndEmptyArrays: true } },

      // Apply keyword filtering AFTER lookups, because we may filter on driver.fullName / car.name
      ...(keyword
        ? [
            keywordIsObjectId
              ? { $match: { _id: new mongoose.Types.ObjectId(keyword) } }
              : {
                  $match: {
                    $or: [
                      { 'driver.fullName': { $regex: keywordRegex, $options: options } },
                      { 'car.name': { $regex: keywordRegex, $options: options } },
                    ],
                  },
                },
          ]
        : []),

      {
        $facet: {
          resultData: [
            { $sort: { createdAt: -1, _id: 1 } },
            { $skip: (page - 1) * size },
            { $limit: size },
          ],
          pageInfo: [{ $count: 'totalRecords' }],
        },
      },
    ])

    res.json(data)
  } catch (err) {
    logger.error(`[booking.getBookings] ${i18n.t('DB_ERROR')} ${JSON.stringify(req.body)}`, err)
    res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Check if a driver has Bookings.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const hasBookings = async (req: Request, res: Response) => {
  const { driver } = req.params

  try {
    const count = await Booking
      .find({
        driver: new mongoose.Types.ObjectId(driver),
      })
      .limit(1)
      .countDocuments()

    if (count === 1) {
      res.sendStatus(200)
      return
    }

    res.sendStatus(204)
  } catch (err) {
    logger.error(`[booking.hasBookings] ${i18n.t('DB_ERROR')} ${driver}`, err)
    res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Cancel a Booking.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const cancelBooking = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const booking = await Booking
      .findOne({
        _id: new mongoose.Types.ObjectId(id),
      })
      .populate<{ driver: env.User }>('driver')

    if (booking && booking.cancellation && !booking.cancelRequest) {
      booking.cancelRequest = true
      await booking.save()

      // Notify supplier
       const user = await User.findById(booking.driver)
      // if (!supplier) {
      //   logger.info(`Supplier ${booking.supplier} not found`)
      //   res.sendStatus(204)
      //   return
      // }
      // i18n.locale = supplier.language
      //! await notify(booking.driver, booking.id, user, i18n.t('CANCEL_BOOKING_NOTIFICATION'))

      // Notify admin
      const admin = !!env.ADMIN_EMAIL && (await User.findOne({ email: env.ADMIN_EMAIL, type: bookcarsTypes.UserType.Admin }))
      if (admin) {
        i18n.locale = admin.language
        await notify(booking.driver, booking.id, admin, i18n.t('CANCEL_BOOKING_NOTIFICATION'))
      }

      res.sendStatus(200)
      return
    }

    res.sendStatus(204)
  } catch (err) {
    logger.error(`[booking.cancelBooking] ${i18n.t('DB_ERROR')} ${id}`, err)
    res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}
