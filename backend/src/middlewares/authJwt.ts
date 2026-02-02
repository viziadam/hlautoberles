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
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
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

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  // --- DEBUG START ---
  console.log('--- Auth Debug Start ---');
  console.log('Headers Host:', req.headers.host);
  console.log('X-Forwarded-Host:', req.headers['x-forwarded-host']);
  console.log('Signed Cookies:', req.signedCookies);
  // --- DEBUG END ---

  let token: string | undefined;
  
  // Sütik kinyerése
  const adminToken = req.signedCookies[env.ADMIN_AUTH_COOKIE_NAME] as string;
  const frontendToken = req.signedCookies[env.FRONTEND_AUTH_COOKIE_NAME] as string;

  // Logika: Ha van admin süti, adminnak kezeljük, ha nincs, nézzük a frontendet
  if (adminToken) {
    console.log('Debug: Admin token found in cookies');
    token = adminToken;
  } else if (frontendToken) {
    console.log('Debug: Frontend token found in cookies');
    token = frontendToken;
  } else {
    // Mobil/Unit teszt ág
    token = req.headers[env.X_ACCESS_TOKEN] as string;
    console.log('Debug: No cookies found, checking header token:', token ? 'Found' : 'Not found');
  }

  if (token) {
    try {
      const sessionData = await authHelper.decryptJWT(token);
      console.log('Debug: JWT Decrypted successfully. User ID:', sessionData?.id);

      const isActualAdmin = !!adminToken;
      const isActualFrontend = !!frontendToken && !adminToken;

      const $match: mongoose.FilterQuery<bookcarsTypes.User> = {
        $and: [{ _id: sessionData?.id }],
      };

      // Jogosultság szűkítése
      if (isActualAdmin) {
        console.log('Debug: Validating as Admin role');
        $match.$and?.push({ type: { $in: [bookcarsTypes.UserType.Admin] } });
      } else if (isActualFrontend) {
        console.log('Debug: Validating as Frontend User role');
        $match.$and?.push({ type: bookcarsTypes.UserType.User });
      }

      const userExists = await User.exists($match);
      
      if (!sessionData || !helper.isValidObjectId(sessionData.id) || !userExists) {
        console.warn('Debug Auth Fail: User does not exist or invalid ID. Match query:', JSON.stringify($match));
        logger.info('Token not valid: User not found');
        return res.status(401).send({ message: 'Unauthorized!' });
      }

      console.log('Debug: Auth Successful, calling next()');
      console.log('--- Auth Debug End ---');
      next();
    } catch (err) {
      console.error('Debug Auth Error: JWT Decryption failed', err);
      logger.info('Token not valid', err);
      return res.status(401).send({ message: 'Unauthorized!' });
    }
  } else {
    console.warn('Debug Auth Fail: No token source found (neither cookie nor header)');
    console.log('--- Auth Debug End ---');
    return res.status(403).send({ message: 'No token provided!' });
  }
};

export default { verifyToken }
