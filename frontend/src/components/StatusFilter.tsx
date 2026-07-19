import React, { useEffect, useMemo, useState } from 'react'
import * as bookcarsTypes from ':bookcars-types'
import * as bookcarsHelper from ':bookcars-helper'
import { strings as commonStrings } from '@/lang/common'
import {
  getAllBookingStatuses,
  getBookingStatusItems,
} from '@/utils/bookingStatus'
import Accordion from '@/components/Accordion'
import BookingStatus from './BookingStatus'

import '@/assets/css/status-filter.css'

interface StatusFilterProps {
  className?: string
  collapse?: boolean
  onChange?: (value: bookcarsTypes.BookingStatus[]) => void
}

const DEFAULT_STATUSES: bookcarsTypes.BookingStatus[] = [
  bookcarsTypes.BookingStatus.Pending,
  bookcarsTypes.BookingStatus.Reserved,
  'completed' as bookcarsTypes.BookingStatus,
]

const StatusFilter = ({
  className,
  collapse,
  onChange,
}: StatusFilterProps) => {
  const statuses = useMemo(() => getBookingStatusItems(), [])
  const allStatuses = useMemo(() => getAllBookingStatuses(), [])
  const [checkedStatuses, setCheckedStatuses] = (
    useState<bookcarsTypes.BookingStatus[]>(DEFAULT_STATUSES)
  )

  const allChecked = (
    checkedStatuses.length > 0
    && checkedStatuses.length === allStatuses.length
  )

  const handleChange = (
    next: bookcarsTypes.BookingStatus[],
  ) => {
    if (!onChange) {
      return
    }

    onChange(
      next.length === 0
        ? allStatuses
        : bookcarsHelper.clone(next),
    )
  }

  useEffect(() => {
    handleChange(DEFAULT_STATUSES)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleStatus = (
    status: bookcarsTypes.BookingStatus,
  ) => {
    setCheckedStatuses((previous) => {
      const next = previous.includes(status)
        ? previous.filter((item) => item !== status)
        : [...previous, status]

      handleChange(next)
      return next
    })
  }

  const handleCheckAllToggle = () => {
    const next = allChecked ? [] : allStatuses

    setCheckedStatuses(next)
    handleChange(next)
  }

  return (
    (allStatuses.length > 0 && (
      <Accordion
        title={commonStrings.STATUS}
        collapse={collapse}
        className={
          `${className ? `${className} ` : ''}status-filter`
        }
      >
        <ul className="status-list">
          {statuses.map((status) => {
            const isChecked = checkedStatuses.includes(status.value)

            return (
              <li key={status.value}>
                <input
                  type="checkbox"
                  data-value={status.value}
                  className="status-checkbox"
                  checked={isChecked}
                  onChange={() => toggleStatus(status.value)}
                />
                <BookingStatus
                  value={status.value}
                  onClick={() => toggleStatus(status.value)}
                />
              </li>
            )
          })}
        </ul>

        <div className="filter-actions">
          <span
            onClick={handleCheckAllToggle}
            className="uncheckall"
            role="button"
            tabIndex={0}
          >
            {allChecked
              ? commonStrings.UNCHECK_ALL
              : commonStrings.CHECK_ALL}
          </span>
        </div>
      </Accordion>
    )) || <></>
  )
}

export default StatusFilter
