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
  console.log('--- Auth Debug Start ---');
  
  const adminToken = req.signedCookies[env.ADMIN_AUTH_COOKIE_NAME] as string;
  const frontendToken = req.signedCookies[env.FRONTEND_AUTH_COOKIE_NAME] as string;

  // Megnézzük a referer-t, hogy eldöntsük, melyik sütit KELLENE használnunk
  const referer = req.headers.referer || '';
  const isRequestingAdmin = referer.includes('/admin');

  let token: string | undefined;
  let isActualAdmin = false;
  let isActualFrontend = false;

  // Logika finomítása:
  if (isRequestingAdmin && adminToken) {
    console.log('Debug: Admin area request - Using Admin Token');
    token = adminToken;
    isActualAdmin = true;
  } else if (frontendToken) {
    console.log('Debug: Frontend area request (or fallback) - Using Frontend Token');
    token = frontendToken;
    isActualFrontend = true;
  } else if (adminToken) {
    // Ha nem admin terület, de csak admin süti van (pl. admin akar kocsit foglalni)
    console.log('Debug: No frontend token, but admin is logged in');
    token = adminToken;
    isActualAdmin = true;
  } else {
    token = req.headers[env.X_ACCESS_TOKEN] as string;
  }

  if (!token) {
    console.warn('Debug: No token found at all');
    return res.status(403).send({ message: 'No token provided!' });
  }

  try {
    const sessionData = await authHelper.decryptJWT(token);
    console.log('Debug: Decrypted ID:', sessionData?.id, 'Role:', isActualAdmin ? 'Admin' : 'User');

    const $match: mongoose.FilterQuery<bookcarsTypes.User> = {
      _id: new mongoose.Types.ObjectId(sessionData?.id),
    };

    if (isActualAdmin) {
      $match.type = { $in: [bookcarsTypes.UserType.Admin] };
    } else {
      // Ha frontend tokenünk van, akkor sima User-t keresünk
      $match.type = bookcarsTypes.UserType.User;
    }

    const userExists = await User.exists($match);
    
    if (!sessionData || !userExists) {
      console.error('Debug Auth Fail: User not found with these criteria:', $match);
      return res.status(401).send({ message: 'Unauthorized!' });
    }

    console.log('Debug: Auth Successful');
    return next();
  } catch (err) {
    console.error('Debug: JWT Decrypt error or DB error:', err);
    return res.status(401).send({ message: 'Unauthorized!' });
  }
};

// Exportálás objektumként
export default { verifyToken };
