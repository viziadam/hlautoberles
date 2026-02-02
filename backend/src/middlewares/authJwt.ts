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
  // --- DEBUG ---
  console.log('--- Auth Debug Start ---');
  console.log('Signed Cookies:', req.signedCookies);
  
  const adminToken = req.signedCookies[env.ADMIN_AUTH_COOKIE_NAME] as string;
  const frontendToken = req.signedCookies[env.FRONTEND_AUTH_COOKIE_NAME] as string;

  let token: string | undefined;

  if (adminToken) {
    console.log('Debug: Admin token found');
    token = adminToken;
  } else if (frontendToken) {
    console.log('Debug: Frontend token found');
    token = frontendToken;
  } else {
    token = req.headers[env.X_ACCESS_TOKEN] as string;
  }

  if (!token) {
    console.warn('Debug: No token found');
    return res.status(403).send({ message: 'No token provided!' });
  }

  try {
    const sessionData = await authHelper.decryptJWT(token);
    
    const isActualAdmin = !!adminToken;
    const isActualFrontend = !!frontendToken && !adminToken;

    const $match: mongoose.FilterQuery<bookcarsTypes.User> = {
      _id: sessionData?.id,
    };

    if (isActualAdmin) {
      $match.type = { $in: [bookcarsTypes.UserType.Admin] };
    } else if (isActualFrontend) {
      $match.type = bookcarsTypes.UserType.User;
    }

    const userExists = await User.exists($match);
    
    if (!sessionData || !helper.isValidObjectId(sessionData.id) || !userExists) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }

    console.log('Debug: Auth Successful');
    return next(); // Fontos a return!
  } catch (err) {
    return res.status(401).send({ message: 'Unauthorized!' });
  }
};

// Exportálás objektumként
export default { verifyToken };
