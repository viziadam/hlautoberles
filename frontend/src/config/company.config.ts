import * as bookcarsTypes from ':bookcars-types'
import env from '@/config/env.config'

const latitude = Number(env.MAP_LATITUDE)
const longitude = Number(env.MAP_LONGITUDE)

export const COMPANY_POSITION: [number, number] = [
  latitude,
  longitude,
]

export const COMPANY_LOCATION: bookcarsTypes.Location = {
  _id: 'hl-auto-rental-depot',
  name: env.COMPANY_ADDRESS,
  latitude,
  longitude,
} as bookcarsTypes.Location

export const COMPANY_MAP_ZOOM = Number(env.MAP_ZOOM) || 14
