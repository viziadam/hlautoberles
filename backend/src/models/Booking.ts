import { Schema, model } from 'mongoose'
import * as bookcarsTypes from ':bookcars-types'
import * as env from '../config/env.config'

export const BOOKING_EXPIRE_AT_INDEX_NAME = 'expireAt'
export const COMPLETED_BOOKING_STATUS = (
  bookcarsTypes.BookingStatus.Completed
)

export interface BookingDocument extends env.Booking {
  reviewRequestSentAt?: Date
  reviewRequestClaimedAt?: Date
  reviewRequestSkippedAt?: Date
  reviewRequestSkipReason?: string
}

const bookingSchema = new Schema<BookingDocument>(
  {
    car: {
      type: Schema.Types.ObjectId,
      required: [true, "can't be blank"],
      ref: 'Car',
    },
    driver: {
      type: Schema.Types.ObjectId,
      required: [true, "can't be blank"],
      ref: 'User',
      index: true,
    },
    from: {
      type: Date,
      required: [true, "can't be blank"],
    },
    to: {
      type: Date,
      required: [true, "can't be blank"],
    },
    status: {
      type: String,
      enum: [
        bookcarsTypes.BookingStatus.Void,
        bookcarsTypes.BookingStatus.Pending,
        bookcarsTypes.BookingStatus.Reserved,
        COMPLETED_BOOKING_STATUS,
        bookcarsTypes.BookingStatus.Cancelled,
      ],
      required: [true, "can't be blank"],
    },
    cancellation: {
      type: Boolean,
      default: false,
    },
    theftProtection: {
      type: Boolean,
      default: false,
    },
    fullInsurance: {
      type: Boolean,
      default: false,
    },
    toolsIncluded: {
      type: Boolean,
      default: false,
    },
    chauffeurRequested: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      required: [true, "can't be blank"],
    },
    cancelRequest: {
      type: Boolean,
      default: false,
    },
    sessionId: {
      type: String,
      index: true,
    },
    paymentIntentId: {
      type: String,
    },
    customerId: {
      type: String,
    },
    isDeposit: {
      type: Boolean,
      default: false,
    },
    isPayedInFull: {
      type: Boolean,
      default: false,
    },
    paypalOrderId: {
      type: String,
    },
    reviewRequestSentAt: {
      type: Date,
      index: true,
    },
    reviewRequestClaimedAt: {
      type: Date,
      index: true,
    },
    reviewRequestSkippedAt: {
      type: Date,
      index: true,
    },
    reviewRequestSkipReason: {
      type: String,
      trim: true,
    },
    expireAt: {
      type: Date,
      index: {
        name: BOOKING_EXPIRE_AT_INDEX_NAME,
        expireAfterSeconds: env.BOOKING_EXPIRE_AT,
        background: true,
      },
    },
  },
  {
    timestamps: true,
    strict: true,
    collection: 'Booking',
  },
)

bookingSchema.index({ 'driver._id': 1 })
bookingSchema.index({ 'car._id': 1 })
bookingSchema.index({ from: 1, to: 1 })
bookingSchema.index({ 'driver.fullName': 1 })
bookingSchema.index({ 'car.name': 1 })
bookingSchema.index({
  status: 1,
  to: 1,
  reviewRequestSentAt: 1,
  reviewRequestSkippedAt: 1,
  reviewRequestClaimedAt: 1,
})

const Booking = model<BookingDocument>('Booking', bookingSchema)

export default Booking
