import React, { useEffect, useState, type CSSProperties } from 'react'
import {
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
  type TextFieldVariants,
} from '@mui/material'
import * as bookcarsTypes from ':bookcars-types'
import { strings as commonStrings } from '@/lang/common'
import {
  COMPLETED_BOOKING_STATUS,
  getBookingStatusLabel,
  getCompletedReviewNotice,
} from '@/utils/bookingStatus'

import '@/assets/css/status-list.css'

interface StatusListProps {
  value?: string
  label?: string
  required?: boolean
  variant?: TextFieldVariants
  disabled?: boolean
  style?: CSSProperties
  onChange?: (value: bookcarsTypes.BookingStatus) => void
}

const StatusList = ({
  value: statusListValue,
  label,
  required,
  variant,
  disabled,
  style,
  onChange,
}: StatusListProps) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    if (statusListValue && statusListValue !== value) {
      setValue(statusListValue)
    }
  }, [statusListValue, value])

  const handleChange = (event: SelectChangeEvent<string>) => {
    const nextValue = event.target.value as bookcarsTypes.BookingStatus

    setValue(nextValue)
    onChange?.(nextValue)
  }

  return (
    <div style={style || {}}>
      {disabled ? (
        <span
          className={`bs-s-sv bs-s-${value.toLowerCase()}`}
          style={{ marginTop: 5 }}
        >
          {getBookingStatusLabel(
            value as bookcarsTypes.BookingStatus,
          )}
        </span>
      ) : (
        <>
          <InputLabel className={required ? 'required' : ''}>
            {label}
          </InputLabel>

          <Select
            label={label}
            value={value}
            onChange={handleChange}
            variant={variant || 'standard'}
            required={required}
            fullWidth
            renderValue={(selectedValue) => (
              <span
                className={
                  `bs-s-sv bs-s-${selectedValue.toLowerCase()}`
                }
              >
                {getBookingStatusLabel(
                  selectedValue as bookcarsTypes.BookingStatus,
                )}
              </span>
            )}
          >
            <MenuItem
              value={bookcarsTypes.BookingStatus.Void}
              className="bs-s bs-s-void"
            >
              {commonStrings.BOOKING_STATUS_VOID}
            </MenuItem>

            <MenuItem
              value={bookcarsTypes.BookingStatus.Pending}
              className="bs-s bs-s-pending"
            >
              {commonStrings.BOOKING_STATUS_PENDING}
            </MenuItem>

            <MenuItem
              value={bookcarsTypes.BookingStatus.Reserved}
              className="bs-s bs-s-reserved"
            >
              {commonStrings.BOOKING_STATUS_RESERVED}
            </MenuItem>

            <MenuItem
              value={COMPLETED_BOOKING_STATUS}
              className="bs-s bs-s-completed"
            >
              {getBookingStatusLabel(COMPLETED_BOOKING_STATUS)}
            </MenuItem>

            <MenuItem
              value={bookcarsTypes.BookingStatus.Cancelled}
              className="bs-s bs-s-cancelled"
            >
              {commonStrings.BOOKING_STATUS_CANCELLED}
            </MenuItem>
          </Select>

          {value === COMPLETED_BOOKING_STATUS && (
            <FormHelperText className="completed-review-notice">
              {getCompletedReviewNotice()}
            </FormHelperText>
          )}
        </>
      )}
    </div>
  )
}

export default StatusList
