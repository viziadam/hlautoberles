import 'dotenv/config'
import * as env from '../src/config/env.config'
import * as logger from '../src/utils/logger'
import * as databaseHelper from '../src/utils/databaseHelper'
import Car from '../src/models/Car'

if (
  await databaseHelper.connect(env.DB_URI, env.DB_SSL, env.DB_DEBUG)
) {
  const cars = await Car.find({})

  for (const car of cars) {
    if (('price' in car) && car.price) {
      car.dailyPrice1_3 = Number(car.price)
      car.dailyPrice4_6 = 0
      // car.biWeeklyPrice = null
      // car.discountedBiWeeklyPrice = null
      car.weeklyPrice1_2 = null
      car.weeklyPrice3_4 = null
      car.monthlyPrice = null
      // car.discountedMonthlyPrice = null
      car.price = undefined
      await car.save()
      logger.info(`${car.id} affected`)
    }
  }

  await databaseHelper.close()
  logger.info('MongoDB connection closed')
  process.exit(0)
}
