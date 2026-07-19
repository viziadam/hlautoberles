import React, { useState } from 'react'
import * as bookcarsTypes from ':bookcars-types'
import Layout from '@/components/Layout'
import env from '@/config/env.config'
import { getAllBookingStatuses } from '@/utils/bookingStatus'
import BookingList from '@/components/BookingList'
import StatusFilter from '@/components/StatusFilter'
import BookingFilter from '@/components/BookingFilter'

import '@/assets/css/bookings.css'

const Bookings = () => {
  const [user, setUser] = useState<bookcarsTypes.User>()
  const [statuses, setStatuses] = useState(
    getAllBookingStatuses(),
  )
  const [filter, setFilter] = useState<bookcarsTypes.Filter | null>()
  const [loadingSuppliers, setLoadingSuppliers] = useState(true)

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
    setUser(loadedUser)
    setLoadingSuppliers(true)
    setLoadingSuppliers(false)
  }

  return (
    <>
      <Layout onLoad={onLoad} strict>
        {user && (
          <div className="bookings">
            <div className="col-1">
              <div>
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
              </div>
            </div>

            <div className="col-2">
              <BookingList
                user={user}
                language={user.language}
                statuses={statuses}
                filter={filter}
                loading={loadingSuppliers}
                hideDates={env.isMobile}
                checkboxSelection={false}
                hideSupplierColumn={env.HIDE_SUPPLIERS}
              />
            </div>
          </div>
        )}
      </Layout>
    </>
  )
}

export default Bookings
