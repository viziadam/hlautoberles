import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
  type GridRenderCellParams,
  type GridRowId,
} from '@mui/x-data-grid'
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Tooltip,
} from '@mui/material'
import {
  Cancel as CancelIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material'
import { format } from 'date-fns'
import { getDateFnsLocale } from '@/utils/dateLocale'
import * as bookcarsTypes from ':bookcars-types'
import * as bookcarsHelper from ':bookcars-helper'
import * as BookingService from '@/services/BookingService'
import * as PaymentService from '@/services/PaymentService'
import * as helper from '@/utils/helper'
import { getBookingStatusLabel } from '@/utils/bookingStatus'
import { strings } from '@/lang/booking-list'
import { strings as commonStrings } from '@/lang/common'
import env from '@/config/env.config'
import BookingStatus from '@/components/BookingStatus'
import Extras from '@/components/Extras'

import '@/assets/css/booking-list.css'

interface BookingListProps {
  suppliers?: string[]
  statuses?: string[]
  filter?: bookcarsTypes.Filter | null
  car?: string
  user?: bookcarsTypes.User
  hideDates?: boolean
  hideCarColumn?: boolean
  hideSupplierColumn?: boolean
  language?: string
  loading?: boolean
  checkboxSelection?: boolean
  onLoad?: bookcarsTypes.DataEvent<bookcarsTypes.Booking>
}

const BookingList = ({
  statuses: bookingStatuses,
  filter: bookingFilter,
  car: bookingCar,
  user: bookingUser,
  hideDates,
  hideCarColumn,
  language,
  checkboxSelection,
  onLoad,
}: BookingListProps) => {
  const navigate = useNavigate()

  const [user, setUser] = useState<bookcarsTypes.User>()
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(
    env.isMobile
      ? env.BOOKINGS_MOBILE_PAGE_SIZE
      : env.BOOKINGS_PAGE_SIZE,
  )
  const [columns, setColumns] = useState<
    GridColDef<bookcarsTypes.Booking>[]
  >([])
  const [rows, setRows] = useState<bookcarsTypes.Booking[]>([])
  const [rowCount, setRowCount] = useState(0)
  const [fetch, setFetch] = useState(false)
  const [selectedId, setSelectedId] = useState('')
  const [statuses, setStatuses] = useState<string[] | undefined>(
    bookingStatuses,
  )
  const [filter, setFilter] = useState<
    bookcarsTypes.Filter | undefined | null
  >(bookingFilter)
  const [car, setCar] = useState<string>(bookingCar || '')
  const [paginationModel, setPaginationModel] = (
    useState<GridPaginationModel>({
      pageSize: env.BOOKINGS_PAGE_SIZE,
      page: 0,
    })
  )
  const [loading, setLoading] = useState(true)
  const [openCancelDialog, setOpenCancelDialog] = useState(false)
  const [cancelRequestSent, setCancelRequestSent] = useState(false)
  const [cancelRequestProcessing, setCancelRequestProcessing] = (
    useState(false)
  )

  useEffect(() => {
    if (!env.isMobile) {
      setPage(paginationModel.page)
      setPageSize(paginationModel.pageSize)
    }
  }, [paginationModel])

  const fetchData = async (
    requestedPage: number,
    requestedUser?: bookcarsTypes.User,
    requestedCar?: string,
  ) => {
    try {
      const requestedPageSize = env.isMobile
        ? env.BOOKINGS_MOBILE_PAGE_SIZE
        : pageSize

      if (!statuses) {
        setRows([])
        setRowCount(0)
        onLoad?.({ rows: [], rowCount: 0 })
        return
      }

      setLoading(true)

      const payload: bookcarsTypes.GetBookingsPayload = {
        statuses,
        filter: filter || undefined,
        car: requestedCar || car,
        user: requestedUser?._id || undefined,
      }

      const data = await BookingService.getBookings(
        payload,
        requestedPage + 1,
        requestedPageSize,
      )
      const result = data?.[0] || {
        pageInfo: { totalRecord: 0 },
        resultData: [],
      }

      if (!result) {
        helper.error()
        return
      }

      const totalRecords = (
        Array.isArray(result.pageInfo)
        && result.pageInfo.length > 0
      )
        ? result.pageInfo[0].totalRecords
        : 0

      for (const booking of result.resultData) {
        booking.price = await PaymentService.convertPrice(
          booking.price!,
        )
      }

      if (env.isMobile) {
        const nextRows = requestedPage === 0
          ? result.resultData
          : [...rows, ...result.resultData]

        setRows(nextRows)
        setRowCount(totalRecords)
        setFetch(result.resultData.length > 0)
      } else {
        setRows(result.resultData)
        setRowCount(totalRecords)
      }

      onLoad?.({
        rows: result.resultData,
        rowCount: totalRecords,
      })
    } catch (error) {
      helper.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setStatuses(bookingStatuses)
  }, [bookingStatuses])

  useEffect(() => {
    setFilter(bookingFilter)
  }, [bookingFilter])

  useEffect(() => {
    setCar(bookingCar || '')

    if (bookingCar) {
      void fetchData(page, user, bookingCar)
    }
  }, [bookingCar]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setUser(bookingUser)

    if (bookingUser) {
      void fetchData(page, bookingUser, car)
    }
  }, [bookingUser]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (statuses && user) {
      void fetchData(page, user)
    }
  }, [page]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (statuses && user) {
      if (page === 0) {
        void fetchData(0, user)
      } else {
        const nextPaginationModel = bookcarsHelper.clone(
          paginationModel,
        )
        nextPaginationModel.page = 0
        setPaginationModel(nextPaginationModel)
      }
    }
  }, [pageSize]) // eslint-disable-line react-hooks/exhaustive-deps

  const getDate = (date?: string) => {
    if (!date) {
      throw new Error('Invalid date')
    }

    const parsedDate = new Date(date)

    return (
      `${bookcarsHelper.formatDatePart(parsedDate.getDate())}`
      + `-${bookcarsHelper.formatDatePart(parsedDate.getMonth() + 1)}`
      + `-${parsedDate.getFullYear()}`
    )
  }

  const getColumns = (): GridColDef<bookcarsTypes.Booking>[] => {
    const bookingColumns: GridColDef<bookcarsTypes.Booking>[] = [
      {
        field: 'from',
        headerName: commonStrings.FROM,
        flex: 1,
        valueGetter: (value: string) => getDate(value),
      },
      {
        field: 'to',
        headerName: commonStrings.TO,
        flex: 1,
        valueGetter: (value: string) => getDate(value),
      },
      {
        field: 'price',
        headerName: strings.PRICE,
        flex: 1,
        renderCell: ({
          value,
        }: GridRenderCellParams<bookcarsTypes.Booking, string>) => (
          <span className="bp">{value}</span>
        ),
        valueGetter: (value: number) => bookcarsHelper.formatPrice(
          value,
          commonStrings.CURRENCY,
          language as string,
        ),
      },
      {
        field: 'status',
        headerName: strings.STATUS,
        flex: 1,
        renderCell: ({
          value,
        }: GridRenderCellParams<
          bookcarsTypes.Booking,
          bookcarsTypes.BookingStatus
        >) => <BookingStatus value={value!} showIcon />,
        valueGetter: (value: string) => value,
      },
      {
        field: 'action',
        headerName: '',
        sortable: false,
        disableColumnMenu: true,
        renderCell: ({
          row,
        }: GridRenderCellParams<bookcarsTypes.Booking>) => {
          const cancelBooking = (
            event: React.MouseEvent<HTMLElement>,
          ) => {
            event.stopPropagation()
            setSelectedId(row._id || '')
            setOpenCancelDialog(true)
          }

          const today = new Date()
          today.setHours(0, 0, 0, 0)

          return (
            <>
              <Tooltip title={strings.VIEW}>
                <IconButton
                  onClick={() => navigate(`/booking?b=${row._id}`)}
                >
                  <ViewIcon />
                </IconButton>
              </Tooltip>

              {row.cancellation
                && !row.cancelRequest
                && row.status !== bookcarsTypes.BookingStatus.Cancelled
                && new Date(row.from) >= today && (
                  <Tooltip title={strings.CANCEL}>
                    <IconButton onClick={cancelBooking}>
                      <CancelIcon />
                    </IconButton>
                  </Tooltip>
                )}
            </>
          )
        },
      },
    ]

    if (hideDates) {
      bookingColumns.splice(0, 2)
    }

    if (!hideCarColumn) {
      bookingColumns.unshift({
        field: 'car',
        headerName: strings.CAR,
        flex: 1,
        valueGetter: (value: bookcarsTypes.Car) => value?.name,
      })
    }

    return bookingColumns
  }

  useEffect(() => {
    if (statuses && user) {
      setColumns(getColumns())

      if (page === 0) {
        void fetchData(0, user)
      } else {
        const nextPaginationModel = bookcarsHelper.clone(
          paginationModel,
        )
        nextPaginationModel.page = 0
        setPaginationModel(nextPaginationModel)
      }
    }
  }, [statuses, filter]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!env.isMobile) {
      return
    }

    const element = document.querySelector('body')

    if (element) {
      element.onscroll = () => {
        if (
          fetch
          && !loading
          && window.scrollY > 0
          && window.scrollY
            + window.innerHeight
            + env.INFINITE_SCROLL_OFFSET
            >= document.body.scrollHeight
        ) {
          setLoading(true)
          setPage(page + 1)
        }
      }
    }
  }, [page, fetch, loading])

  const handleCloseCancelBooking = () => {
    setOpenCancelDialog(false)

    if (cancelRequestSent) {
      setTimeout(() => setCancelRequestSent(false), 500)
    }
  }

  const handleConfirmCancelBooking = async () => {
    try {
      setCancelRequestProcessing(true)
      const responseStatus = await BookingService.cancel(selectedId)

      if (responseStatus !== 200) {
        helper.error()
        setOpenCancelDialog(false)
        return
      }

      const row = rows.find((booking) => booking._id === selectedId)

      if (!row) {
        helper.error()
        return
      }

      row.cancelRequest = true
      setCancelRequestSent(true)
      setRows([...rows])
      setSelectedId('')
    } catch (error) {
      helper.error(error)
      setOpenCancelDialog(false)
    } finally {
      setCancelRequestProcessing(false)
    }
  }

  const dateLocale = getDateFnsLocale(language)
  const dateFormat = 'PPPPp'
  const bookingDetailHeight = env.SUPPLIER_IMAGE_HEIGHT + 10

  return (
    <div className="bs-list">
      {user && (env.isMobile ? (
        <>
          {rows.map((booking) => {
            const bookingCar = booking.car as bookcarsTypes.Car
            const from = new Date(booking.from)
            const to = new Date(booking.to)
            const days = bookcarsHelper.days(from, to)

            return (
              <div key={booking._id} className="booking-details">
                <div
                  className={
                    `bs bs-${booking.status.toLowerCase()}`
                  }
                >
                  <span>
                    {getBookingStatusLabel(booking.status)}
                  </span>
                </div>

                <div
                  className="booking-detail"
                  style={{ height: bookingDetailHeight }}
                >
                  <span className="booking-detail-title">
                    {strings.CAR}
                  </span>
                  <div className="booking-detail-value">
                    {bookingCar.name}
                  </div>
                </div>

                <div
                  className="booking-detail"
                  style={{ height: bookingDetailHeight }}
                >
                  <span className="booking-detail-title">
                    {strings.DAYS}
                  </span>
                  <div className="booking-detail-value">
                    {`${helper.getDaysShort(days)} (${bookcarsHelper.capitalize(
                      format(from, dateFormat, {locale: dateLocale,}),
                    )} - ${bookcarsHelper.capitalize(
                      format(to, dateFormat, {locale: dateLocale,}),
                    )})`}
                  </div>
                </div>

                <div
                  className="booking-detail"
                  style={{ height: bookingDetailHeight }}
                >
                  <span className="booking-detail-title">
                    {commonStrings.PICK_UP_LOCATION}
                  </span>
                  <div className="booking-detail-value">
                    {(booking.pickupLocation as bookcarsTypes.Location).name}
                  </div>
                </div>

                <div
                  className="booking-detail"
                  style={{ height: bookingDetailHeight }}
                >
                  <span className="booking-detail-title">
                    {commonStrings.DROP_OFF_LOCATION}
                  </span>
                  <div className="booking-detail-value">
                    {(booking.dropOffLocation as bookcarsTypes.Location).name}
                  </div>
                </div>

                {(booking.cancellation
                  || booking.theftProtection
                  || booking.fullInsurance) && (
                  <Extras booking={booking} days={days} />
                )}

                <div
                  className="booking-detail"
                  style={{ height: bookingDetailHeight }}
                >
                  <span className="booking-detail-title">
                    {strings.COST}
                  </span>
                  <div className="booking-detail-value booking-price">
                    {bookcarsHelper.formatPrice(
                      booking.price as number,
                      commonStrings.CURRENCY,
                      language as string,
                    )}
                  </div>
                </div>

                <div className="bs-buttons">
                  {booking.cancellation
                    && !booking.cancelRequest
                    && booking.status
                      !== bookcarsTypes.BookingStatus.Cancelled
                    && new Date(booking.from) > new Date() && (
                      <Button
                        variant="contained"
                        className="btn-secondary"
                        onClick={() => {
                          setSelectedId(booking._id as string)
                          setOpenCancelDialog(true)
                        }}
                      >
                        {strings.CANCEL}
                      </Button>
                    )}
                </div>
              </div>
            )
          })}
        </>
      ) : (
        <DataGrid
          className="data-grid"
          checkboxSelection={checkboxSelection}
          getRowId={(row): GridRowId => row._id as GridRowId}
          columns={columns}
          rows={rows}
          rowCount={rowCount}
          loading={loading}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: env.BOOKINGS_PAGE_SIZE,
              },
            },
          }}
          pageSizeOptions={[env.BOOKINGS_PAGE_SIZE, 50, 100]}
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          disableRowSelectionOnClick
        />
      ))}

      <Dialog
        disableEscapeKeyDown
        maxWidth="xs"
        open={openCancelDialog}
      >
        <DialogTitle className="dialog-header">
          {!cancelRequestSent
            && !cancelRequestProcessing
            && commonStrings.CONFIRM_TITLE}
        </DialogTitle>

        <DialogContent className="dialog-content">
          {cancelRequestProcessing ? (
            <Stack sx={{ color: '#232323' }}>
              <CircularProgress color="inherit" />
            </Stack>
          ) : cancelRequestSent ? (
            strings.CANCEL_BOOKING_REQUEST_SENT
          ) : (
            strings.CANCEL_BOOKING
          )}
        </DialogContent>

        <DialogActions className="dialog-actions">
          {!cancelRequestProcessing && (
            <Button
              onClick={handleCloseCancelBooking}
              variant="outlined"
              color="primary"
              className="btn-secondary"
            >
              {commonStrings.CLOSE}
            </Button>
          )}

          {!cancelRequestSent && !cancelRequestProcessing && (
            <Button
              onClick={handleConfirmCancelBooking}
              variant="contained"
              className="btn-primary"
            >
              {commonStrings.CONFIRM}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default BookingList
