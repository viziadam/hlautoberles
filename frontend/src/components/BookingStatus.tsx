import React from 'react'
import {
  CheckCircle as CheckIcon,
  RemoveCircle as VoidIcon,
  PauseCircle as PendingIcon,
  Cancel as CancelledIcon,
} from '@mui/icons-material'
import * as bookcarsTypes from ':bookcars-types'
import {
  COMPLETED_BOOKING_STATUS,
  getBookingStatusLabel,
} from '@/utils/bookingStatus'

import '@/assets/css/booking-status.css'

interface BookingStatusProps {
  value: bookcarsTypes.BookingStatus
  showIcon?: boolean
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
}

const getIcon = (value: bookcarsTypes.BookingStatus) => {
  if ([
    bookcarsTypes.BookingStatus.Reserved,
    COMPLETED_BOOKING_STATUS,
  ].includes(value)) {
    return (
      <CheckIcon
        className={`bs-icon bs-icon-${value.toLowerCase()}`}
      />
    )
  }

  if (value === bookcarsTypes.BookingStatus.Void) {
    return <VoidIcon className="bs-icon bs-icon-void" />
  }

  if (value === bookcarsTypes.BookingStatus.Pending) {
    return <PendingIcon className="bs-icon bs-icon-pending" />
  }

  return <CancelledIcon className="bs-icon bs-icon-cancelled" />
}

const BookingStatus = ({
  showIcon,
  onClick,
  value,
}: BookingStatusProps) => (
  <div
    className="booking-status"
    onClick={(event) => onClick?.(event)}
    role="presentation"
  >
    {showIcon && getIcon(value)}
    <span className={`bs bs-${value.toLowerCase()}`}>
      {getBookingStatusLabel(value)}
    </span>
  </div>
)

export default BookingStatus
