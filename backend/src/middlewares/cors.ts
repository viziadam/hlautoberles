// import cors from 'cors'
// import * as helper from '../utils/helper'
// import * as env from '../config/env.config'
// import * as logger from '../utils/logger'

// const whitelist = [
//   helper.trimEnd(env.ADMIN_HOST, '/'),
//   helper.trimEnd(env.FRONTEND_HOST, '/'),
// ]

// console.log('env:', env)

// console.log('FRONTEND_HOST raw:', JSON.stringify(env.FRONTEND_HOST))
// console.log('whitelist:', whitelist.map(x => JSON.stringify(x)))

// /**
//  * CORS configuration.
//  *
//  * @type {cors.CorsOptions}
//  */
// const CORS_CONFIG: cors.CorsOptions = {
//   origin(origin, callback) {
//     if (!origin || whitelist.indexOf(helper.trimEnd(origin, '/')) !== -1) {
//       callback(null, true)
//     } else {
//       const message = `Not allowed by CORS: ${origin}`
//       logger.error(message)
//       callback(new Error(message))
//     }
//   },
//   credentials: true,
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

// /**
//  * CORS middleware.
//  *
//  * @export
//  * @returns {*}
//  */
// export default () => cors(CORS_CONFIG)

import cors from 'cors'
import * as helper from '../utils/helper'
import * as env from '../config/env.config'
import * as logger from '../utils/logger'

// normalize helpers
const stripOuterQuotes = (s: string) => s.replace(/^['"]|['"]$/g, '')
const normalizeOrigin = (s: string) =>
  helper.trimEnd(stripOuterQuotes(String(s ?? '')).trim(), '/')

const whitelistRaw = [env.ADMIN_HOST, env.FRONTEND_HOST]
const whitelist = whitelistRaw.map(normalizeOrigin)

console.log('env.FRONTEND_HOST raw:', JSON.stringify(env.FRONTEND_HOST))
console.log('env.ADMIN_HOST raw:', JSON.stringify(env.ADMIN_HOST))
console.log('whitelist normalized:', whitelist.map(x => JSON.stringify(x)))
console.log('whitelist lengths:', whitelist.map(x => x.length))

const dumpStr = (label: string, s: string) => {
  const codes = Array.from(s).map(ch => ch.charCodeAt(0))
  console.log(label, {
    json: JSON.stringify(s),
    len: s.length,
    codes,
  })
}

const tryUrlParts = (s: string) => {
  try {
    const u = new URL(s)
    return {
      href: u.href,
      origin: u.origin,
      protocol: u.protocol,
      host: u.host,
      hostname: u.hostname,
      port: u.port,
      pathname: u.pathname,
    }
  } catch {
    return { error: 'invalid URL' }
  }
}

/**
 * CORS configuration.
 */
const CORS_CONFIG: cors.CorsOptions = {
  origin(origin, callback) {
    // origin can be undefined for same-origin / server-to-server / some tools
    const originRaw = origin ?? ''
    const originNorm = normalizeOrigin(originRaw)

    console.log('--- CORS CHECK ---')
    dumpStr('incoming originRaw', originRaw)
    dumpStr('incoming originNorm', originNorm)

    console.log('incoming URL parts:', tryUrlParts(originNorm))
    console.log('whitelist URL parts:', whitelist.map(w => tryUrlParts(w)))

    const idx = whitelist.indexOf(originNorm)
    console.log('match index:', idx)
    console.log(
      'equals[]:',
      whitelist.map(w => ({
        w: JSON.stringify(w),
        eq: w === originNorm,
        wlLen: w.length,
        orgLen: originNorm.length,
      }))
    )

    if (!origin || idx !== -1) {
      callback(null, true)
    } else {
      const message = `Not allowed by CORS: originRaw=${originRaw} originNorm=${originNorm}`
      logger.error(message)
      callback(new Error(message))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
}

export default () => cors(CORS_CONFIG)
