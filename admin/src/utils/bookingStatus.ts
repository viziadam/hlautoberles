import * as bookcarsTypes from ':bookcars-types'
import { strings as commonStrings } from '@/lang/common'
import * as UserService from '@/services/UserService'

export const COMPLETED_BOOKING_STATUS = (
  'completed' as bookcarsTypes.BookingStatus
)

const completedLabels: Record<string, string> = {
  hu: 'Teljesítve',
  en: 'Completed',
  fr: 'Terminée',
  es: 'Completada',
}

const reviewNoticeLabels: Record<string, string> = {
  hu: 'A mentés után a rendszer automatikusan elküldi a Google-véleménykérő e-mailt. Egy foglaláshoz csak egyszer küldhető ki, és csak a bérlési időszak lezárulta után.',
  en: 'After saving, the system automatically sends the Google review request email. It can only be sent once per booking and only after the rental period has ended.',
  fr: "Après l’enregistrement, le système envoie automatiquement l’e-mail de demande d’avis Google. Il ne peut être envoyé qu’une seule fois par réservation et uniquement après la fin de la location.",
  es: 'Después de guardar, el sistema envía automáticamente el correo de solicitud de reseña de Google. Solo puede enviarse una vez por reserva y después de finalizar el alquiler.',
}

const language = () => UserService.getLanguage() || 'hu'

export const getBookingStatusLabel = (
  status?: bookcarsTypes.BookingStatus,
) => {
  switch (status) {
    case bookcarsTypes.BookingStatus.Void:
      return commonStrings.BOOKING_STATUS_VOID

    case bookcarsTypes.BookingStatus.Pending:
      return commonStrings.BOOKING_STATUS_PENDING

    case bookcarsTypes.BookingStatus.Reserved:
      return commonStrings.BOOKING_STATUS_RESERVED

    case bookcarsTypes.BookingStatus.Cancelled:
      return commonStrings.BOOKING_STATUS_CANCELLED

    case COMPLETED_BOOKING_STATUS:
      return completedLabels[language()] || completedLabels.hu

    default:
      return ''
  }
}

export const getBookingStatusItems = (
): bookcarsTypes.StatusFilterItem[] => [
  {
    value: bookcarsTypes.BookingStatus.Void,
    label: commonStrings.BOOKING_STATUS_VOID,
  },
  {
    value: bookcarsTypes.BookingStatus.Pending,
    label: commonStrings.BOOKING_STATUS_PENDING,
  },
  {
    value: bookcarsTypes.BookingStatus.Reserved,
    label: commonStrings.BOOKING_STATUS_RESERVED,
  },
  {
    value: COMPLETED_BOOKING_STATUS,
    label: completedLabels[language()] || completedLabels.hu,
  },
  {
    value: bookcarsTypes.BookingStatus.Cancelled,
    label: commonStrings.BOOKING_STATUS_CANCELLED,
  },
]

export const getAllBookingStatuses = () => (
  getBookingStatusItems().map((status) => status.value)
)

export const getCompletedReviewNotice = () => (
  reviewNoticeLabels[language()] || reviewNoticeLabels.hu
)

export const getBookingStatusBackgroundColor = (
  status?: bookcarsTypes.BookingStatus,
) => {
  switch (status) {
    case bookcarsTypes.BookingStatus.Void:
      return '#D9D9D9'

    case bookcarsTypes.BookingStatus.Pending:
      return '#FBDCC2'

    case bookcarsTypes.BookingStatus.Reserved:
      return '#D9E7F4'

    case COMPLETED_BOOKING_STATUS:
      return '#D7F2DF'

    case bookcarsTypes.BookingStatus.Cancelled:
      return '#FBDFDE'

    default:
      return ''
  }
}

export const getBookingStatusTextColor = (
  status?: bookcarsTypes.BookingStatus,
) => {
  switch (status) {
    case bookcarsTypes.BookingStatus.Void:
      return '#6E7C86'

    case bookcarsTypes.BookingStatus.Pending:
      return '#EF6C00'

    case bookcarsTypes.BookingStatus.Reserved:
      return '#1E88E5'

    case COMPLETED_BOOKING_STATUS:
      return '#237A3B'

    case bookcarsTypes.BookingStatus.Cancelled:
      return '#E53935'

    default:
      return ''
  }
}
