import mongoose from 'mongoose'
import { Expo, type ExpoPushMessage } from 'expo-server-sdk'
import type { Request, Response } from 'express'
import type { SendMailOptions } from 'nodemailer'
import * as bookcarsTypes from ':bookcars-types'
import Booking, {
  COMPLETED_BOOKING_STATUS,
  type BookingDocument,
} from '../models/Booking'
import User from '../models/User'
import Notification from '../models/Notification'
import NotificationCounter from '../models/NotificationCounter'
import PushToken from '../models/PushToken'
import i18n from '../lang/i18n'
import * as env from '../config/env.config'
import * as helper from '../utils/helper'
import * as logger from '../utils/logger'
import * as mailHelper from '../utils/mailHelper'

const ALLOWED_STATUSES = new Set<string>([
  bookcarsTypes.BookingStatus.Void,
  bookcarsTypes.BookingStatus.Pending,
  bookcarsTypes.BookingStatus.Reserved,
  COMPLETED_BOOKING_STATUS,
  bookcarsTypes.BookingStatus.Cancelled,
])

const statusKey = (status: bookcarsTypes.BookingStatus) => (
  `BOOKING_STATUS_${String(status).toUpperCase()}`
)

const buildStatusMessage = (
  booking: BookingDocument,
  previousStatus: bookcarsTypes.BookingStatus,
) => {
  const fromLabel = i18n.t(statusKey(previousStatus))
  const toLabel = i18n.t(statusKey(booking.status))

  return (
    `${i18n.t('BOOKING_STATUS_CHANGED_NOTIFICATION_PART1')} `
    + `${booking._id} `
    + `${i18n.t('BOOKING_STATUS_CHANGED_NOTIFICATION_PART2')} `
    + `${fromLabel} `
    + `${i18n.t('BOOKING_STATUS_CHANGED_NOTIFICATION_PART3')} `
    + `${toLabel}.`
  )
}

const incrementNotificationCounter = async (
  userId: mongoose.Types.ObjectId,
) => {
  await NotificationCounter.findOneAndUpdate(
    { user: userId },
    { $inc: { count: 1 } },
    { upsert: true, setDefaultsOnInsert: true },
  )
}

const sendPushNotification = async (
  userId: mongoose.Types.ObjectId,
  bookingId: mongoose.Types.ObjectId,
  notificationId: mongoose.Types.ObjectId,
  message: string,
) => {
  const pushToken = await PushToken.findOne({ user: userId })

  if (!pushToken) {
    return
  }

  const { token } = pushToken

  if (!Expo.isExpoPushToken(token)) {
    logger.warn(`Invalid Expo push token for user ${userId}`)
    return
  }

  const expo = new Expo({
    accessToken: env.EXPO_ACCESS_TOKEN,
    useFcmV1: true,
  })
  const messages: ExpoPushMessage[] = [
    {
      to: token,
      sound: 'default',
      body: message,
      data: {
        user: userId,
        notification: notificationId,
        booking: bookingId,
      },
    },
  ]

  for (const chunk of expo.chunkPushNotifications(messages)) {
    try {
      await expo.sendPushNotificationsAsync(chunk)
    } catch (error) {
      logger.error(
        `Failed to send booking status push for ${bookingId}`,
        error,
      )
    }
  }
}

const notifyDriver = async (
  booking: BookingDocument,
  previousStatus: bookcarsTypes.BookingStatus,
) => {
  const driver = await User.findById(booking.driver)

  if (!driver) {
    logger.warn(`Driver ${booking.driver} not found`)
    return
  }

  i18n.locale = driver.language
  const message = buildStatusMessage(booking, previousStatus)
  const notification = await Notification.create({
    user: driver._id,
    message,
    booking: booking._id,
  })

  await incrementNotificationCounter(driver._id)

  if (driver.enableEmailNotifications) {
    const mailOptions: SendMailOptions = {
      from: env.SMTP_FROM,
      to: driver.email,
      subject: message,
      text: [
        `${i18n.t('HELLO')}${driver.fullName},`,
        '',
        message,
        '',
        helper.joinURL(
          env.FRONTEND_HOST,
          `booking?b=${booking._id}`,
        ),
        '',
        env.WEBSITE_NAME,
      ].join('\n'),
      html: `<p>
        ${i18n.t('HELLO')}${driver.fullName},<br><br>
        ${message}<br><br>
        ${helper.joinURL(
          env.FRONTEND_HOST,
          `booking?b=${booking._id}`,
        )}<br><br>
        ${i18n.t('REGARDS')}<br>
      </p>`,
    }

    await mailHelper.sendMail(mailOptions)
  }

  await sendPushNotification(
    driver._id,
    booking._id,
    notification._id,
    message,
  )
}

export const updateStatus = async (
  req: Request,
  res: Response,
) => {
  try {
    const { body }: {
      body: bookcarsTypes.UpdateStatusPayload
    } = req
    const status = body.status as bookcarsTypes.BookingStatus

    if (!ALLOWED_STATUSES.has(String(status))) {
      res.status(400).send('Invalid booking status')
      return
    }

    const ids = body.ids || []

    if (
      ids.length === 0
      || ids.some((id) => !mongoose.isValidObjectId(id))
    ) {
      res.status(400).send('Invalid booking IDs')
      return
    }

    const bookings = await Booking.find({
      _id: { $in: ids },
    })

    for (const booking of bookings) {
      const previousStatus = booking.status

      if (previousStatus === status) {
        continue
      }

      booking.status = status
      await booking.save()

      try {
        await notifyDriver(booking, previousStatus)
      } catch (notificationError) {
        logger.error(
          `Booking ${booking._id} was updated but notification failed`,
          notificationError,
        )
      }
    }

    res.sendStatus(200)
  } catch (error) {
    logger.error(
      `[bookingStatus.updateStatus] ${JSON.stringify(req.body)}`,
      error,
    )
    res.status(400).send(i18n.t('DB_ERROR') + error)
  }
}
