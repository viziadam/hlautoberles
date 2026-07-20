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

import { getTranslator } from '../lang/translator'

import {
  createBrandedEmail,
  escapeHtml,
} from '../utils/emailTemplate'

const ALLOWED_STATUSES = new Set<bookcarsTypes.BookingStatus>([
  bookcarsTypes.BookingStatus.Void,
  bookcarsTypes.BookingStatus.Pending,
  bookcarsTypes.BookingStatus.Reserved,
  bookcarsTypes.BookingStatus.Completed,
  bookcarsTypes.BookingStatus.Cancelled,
])

const statusKey = (status: bookcarsTypes.BookingStatus) => (
  `BOOKING_STATUS_${String(status).toUpperCase()}`
)

const requireObjectId = (
  value: unknown,
  fieldName: string,
): mongoose.Types.ObjectId => {
  if (value instanceof mongoose.Types.ObjectId) {
    return value
  }

  if (
    typeof value === 'string'
    && mongoose.isValidObjectId(value)
  ) {
    return new mongoose.Types.ObjectId(value)
  }

  throw new TypeError(`Invalid ${fieldName}`)
}

const buildStatusMessage = (
  booking: BookingDocument,
  previousStatus: bookcarsTypes.BookingStatus,
  language?: string,
) => {
  const translator = getTranslator(language)

  const fromLabel = String(
    translator.t(
      statusKey(previousStatus),
    ),
  )

  const toLabel = String(
    translator.t(
      statusKey(booking.status),
    ),
  )

  return (
    `${String(
      translator.t(
        'BOOKING_STATUS_CHANGED_NOTIFICATION_PART1',
      ),
    )} `
    + `${booking._id} `
    + `${String(
      translator.t(
        'BOOKING_STATUS_CHANGED_NOTIFICATION_PART2',
      ),
    )} `
    + `${fromLabel} `
    + `${String(
      translator.t(
        'BOOKING_STATUS_CHANGED_NOTIFICATION_PART3',
      ),
    )} `
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
        user: userId.toHexString(),
        notification: notificationId.toHexString(),
        booking: bookingId.toHexString(),
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

  const driverId = requireObjectId(
    driver._id,
    'driver ID',
  )

  const bookingId = requireObjectId(
    booking._id,
    'booking ID',
  )

  const translator = getTranslator(driver.language)

  const message = buildStatusMessage(booking, previousStatus, driver.language,)

  const notification = await Notification.create({
    user: driverId,
    message,
    booking: bookingId,
  })

  const notificationId = requireObjectId(
    notification._id,
    'notification ID',
  )

  await incrementNotificationCounter(driverId)

  if (driver.enableEmailNotifications) {
  const bookingUrl = helper.joinURL(
    env.FRONTEND_HOST,
    `booking?b=${bookingId.toHexString()}`,
  )

  try {
    await mailHelper.sendMail(
      createBrandedEmail({
        language: driver.language,
        to: driver.email,
        subject: message,
        recipientName: driver.fullName,
        bodyText: [
          message,
          '',
          bookingUrl,
        ].join('\n'),
        bodyHtml: `
          <p>${escapeHtml(message)}</p>
          <p>
            <a
              href="${escapeHtml(bookingUrl)}"
              target="_blank"
              rel="noopener noreferrer"
            >
              ${escapeHtml(
                String(
                  translator.t('VIEW_BOOKING'),
                ),
              )}
            </a>
          </p>
        `,
      }),
    )
  } catch (mailError) {
    logger.error(
      `Failed to send booking status email for ${bookingId}`,
      mailError,
    )
  }
}

  await sendPushNotification(
    driverId,
    bookingId,
    notificationId,
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

    const status = body.status

    if (!ALLOWED_STATUSES.has(status)) {
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
      _id: {
        $in: ids,
      },
    })

    if (bookings.length === 0) {
      res.status(404).send('Bookings not found')
      return
    }

    for (const booking of bookings) {
      const previousStatus = booking.status

      if (previousStatus === status) {
        continue
      }

      booking.status = status
      await booking.save()

      try {
        await notifyDriver(
          booking,
          previousStatus,
        )
      } catch (notificationError) {
        logger.error(
          `Booking ${booking._id} was updated `
          + 'but notification failed',
          notificationError,
        )
      }
    }

    res.sendStatus(200)
  } catch (error) {
    logger.error(
      `[bookingStatus.updateStatus] ${
        JSON.stringify(req.body)
      }`,
      error,
    )

    res.status(400).send(
      i18n.t('DB_ERROR') + error,
    )
  }
}
