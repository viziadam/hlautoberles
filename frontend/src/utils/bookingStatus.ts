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

    case COMPLETED_BOOKING_STATUS:
      return completedLabels[language()] || completedLabels.hu

    case bookcarsTypes.BookingStatus.Cancelled:
      return commonStrings.BOOKING_STATUS_CANCELLED

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
