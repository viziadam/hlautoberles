import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import * as bookcarsTypes from ':bookcars-types'
import Layout from '@/components/Layout'
import env from '@/config/env.config'
import { strings } from '@/lang/bookings'
import * as helper from '@/utils/helper'
import { getAllBookingStatuses } from '@/utils/bookingStatus'
import BookingList from '@/components/BookingList'
import StatusFilter from '@/components/StatusFilter'
import BookingFilter from '@/components/BookingFilter'

import '@/assets/css/bookings.css'

const Bookings = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState<bookcarsTypes.User>()
  const [leftPanel, setLeftPanel] = useState(false)
  const [statuses, setStatuses] = useState(
    getAllBookingStatuses(),
  )
  const [filter, setFilter] = useState<bookcarsTypes.Filter | null>()
  const [loadingSuppliers, setLoadingSuppliers] = useState(true)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (user?.verified) {
      const firstColumn = document.querySelector('div.col-1')
      if (firstColumn) {
        setOffset(firstColumn.clientHeight)
      }
    }
  }, [user])

  const handleStatusFilterChange = (
    nextStatuses: bookcarsTypes.BookingStatus[],
  ) => {
    setStatuses(nextStatuses)
  }

  const handleBookingFilterSubmit = (
    nextFilter: bookcarsTypes.Filter | null,
  ) => {
    setFilter(nextFilter)
  }

  const onLoad = async (loadedUser?: bookcarsTypes.User) => {
    if (!loadedUser) {
      return
    }

    const isAdmin = helper.admin(loadedUser)

    setUser(loadedUser)
    setLeftPanel(!isAdmin)
    setLeftPanel(true)
    setLoadingSuppliers(false)
  }

  return (
    <Layout onLoad={onLoad} strict>
      {user && (
        <div className="bookings">
          <div className="col-1">
            {leftPanel && (
              <>
                <Button
                  variant="contained"
                  className="btn-primary cl-new-booking"
                  size="small"
                  onClick={() => navigate('/create-booking')}
                >
                  {strings.NEW_BOOKING}
                </Button>

                <StatusFilter
                  onChange={handleStatusFilterChange}
                  className="cl-status-filter"
                />

                <BookingFilter
                  onSubmit={handleBookingFilterSubmit}
                  language={user.language || env.DEFAULT_LANGUAGE}
                  className="cl-booking-filter"
                  collapse={!env.isMobile}
                />
              </>
            )}
          </div>

          <div className="col-2">
            <BookingList
              containerClassName="bookings"
              offset={offset}
              language={user.language}
              loggedUser={user}
              statuses={statuses}
              filter={filter}
              loading={loadingSuppliers}
              hideDates={env.isMobile}
              checkboxSelection={!env.isMobile}
            />
          </div>
        </div>
      )}
    </Layout>
  )
}

export default Bookings
