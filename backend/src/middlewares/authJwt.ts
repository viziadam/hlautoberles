// import { Request, Response, NextFunction } from 'express'
// import mongoose from 'mongoose'
// import * as bookcarsTypes from ':bookcars-types'
// import * as env from '../config/env.config'
// import * as helper from '../utils/helper'
// import * as authHelper from '../utils/authHelper'
// import * as logger from '../utils/logger'
// import User from '../models/User'

// /**
//  * Verify authentication token middleware.
//  *
//  * @param {Request} req
//  * @param {Response} res
//  * @param {NextFunction} next
//  */
// const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
//   console.log(req.signedCookies)

//   console.log(req.headers.host)

//   console.log(req.headers['x-forwarded-host'])
//   let token: string
//   const isAdmin = authHelper.isAdmin(req)
//   const isFrontend = authHelper.isFrontend(req)

//   console.log('isAdmin: ', isAdmin)
//   console.log('isFrontend: ', isFrontend)

//   if (isAdmin) {
//     token = req.signedCookies[env.ADMIN_AUTH_COOKIE_NAME] as string // admin
//   } else if (isFrontend) {
//     token = req.signedCookies[env.FRONTEND_AUTH_COOKIE_NAME] as string // frontend
//   } else {
//     token = req.headers[env.X_ACCESS_TOKEN] as string // mobile app and unit tests
//   }

//   console.log('token: ', token)

//   if (token) {
//     // Check token
//     try {
//       const sessionData = await authHelper.decryptJWT(token)
//       console.log('sessionData: ', sessionData)
//       const $match: mongoose.FilterQuery<bookcarsTypes.User> = {
//         $and: [
//           { _id: sessionData?.id },
//           // { blacklisted: false },
//         ],
//       }

//       if (isAdmin) {
//         $match.$and?.push({ type: { $in: [bookcarsTypes.UserType.Admin] } })
//       } else if (isFrontend) {
//         $match.$and?.push({ type: bookcarsTypes.UserType.User })
//       }

//       if (
//         !sessionData
//         || !helper.isValidObjectId(sessionData.id)
//         || !(await User.exists($match))
//       ) {
//         // Token not valid!
//         logger.info('Token not valid: User not found')
//         res.status(401).send({ message: 'Unauthorized!' })
//       } else {
//         // Token valid!
//         next()
//       }
//     } catch (err) {
//       // Token not valid!
//       logger.info('Token not valid', err)
//       res.status(401).send({ message: 'Unauthorized!' })
//     }
//   } else {
//     // Token not found!
//     res.status(403).send({ message: 'No token provided!' })
//   }
// }

import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import * as bookcarsTypes from ':bookcars-types'
import * as env from '../config/env.config'
import * as helper from '../utils/helper'
import * as authHelper from '../utils/authHelper'
import * as logger from '../utils/logger'
import User from '../models/User'

/**
 * Verify authentication token middleware.
 */
const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  // 1. Gyűjtsünk be minden lehetséges tokent
  const adminToken = (req.signedCookies?.[env.ADMIN_AUTH_COOKIE_NAME] || req.cookies?.[env.ADMIN_AUTH_COOKIE_NAME]) as string;
  const frontendToken = (req.signedCookies?.[env.FRONTEND_AUTH_COOKIE_NAME] || req.cookies?.[env.FRONTEND_AUTH_COOKIE_NAME]) as string;
  const headerToken = req.headers[env.X_ACCESS_TOKEN] as string;

  // 2. Prioritási sorrend felállítása
  // Ha van admin süti, azt próbáljuk meg először, ha nincs, a frontendet, végül a headert
  const tokensToTry = [
    { token: adminToken, type: bookcarsTypes.UserType.Admin },
    { token: frontendToken, type: bookcarsTypes.UserType.User },
    { token: headerToken, type: null } // A header-nél nem tudjuk előre a típust
  ];

  for (const item of tokensToTry) {
    if (!item.token) continue;

    try {
      const sessionData = await authHelper.decryptJWT(item.token);
      
      if (sessionData && helper.isValidObjectId(sessionData.id)) {
        // Keressük meg a felhasználót
        const user = await User.findById(sessionData.id);

        if (user) {
          // Ha specifikus típust vártunk (süti alapján), ellenőrizzük
          if (item.type && user.type !== item.type) {
            continue; // Rossz típusú süti, próbáljuk a következőt
          }

          // SIKER: Megvan az érvényes token és a hozzá tartozó user
          console.log(`[Auth Success] User: ${user.email}, Mode: ${process.env.NODE_ENV}`);
          (req as any).user = user;
          return next();
        }
      }
    } catch (err) {
      // Ez a token nem érvényes, megyünk a következőre a listában
      continue;
    }
  }

  // 3. Ha egyik token sem vált be
  console.warn(`[Auth Fail] No valid token found. Path: ${req.path}`);
  return res.status(401).send({ message: 'Unauthorized!' });
};

// Exportálás objektumként
export default { verifyToken };
