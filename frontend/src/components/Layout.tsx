import React, { useState, useEffect, ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { Button } from '@mui/material'
import * as bookcarsTypes from ':bookcars-types'
import { strings } from '@/lang/master'
import * as UserService from '@/services/UserService'
import * as helper from '@/utils/helper'
import { useAnalytics } from '@/utils/useAnalytics'
import { useUserContext, UserContextType } from '@/context/UserContext'
import Unauthorized from '@/components/Unauthorized'

import SEOHead from '@/utils/SEOHead'

// interface LayoutProps {
//   strict?: boolean
//   children: ReactNode
//   onLoad?: (user?: bookcarsTypes.User) => void
// }

// interface LayoutProps {
//   strict?: boolean
//   children: ReactNode
//   onLoad?: (user?: bookcarsTypes.User) => void
//   // SEO adatok opcionálisan
//   title?: string
//   description?: string
//   url?: string
// }

type JsonLd = Record<string, unknown>

interface LayoutProps {
  strict?: boolean
  children: ReactNode
  onLoad?: (user?: bookcarsTypes.User) => void

  title?: string
  description?: string
  url?: string
  image?: string
  noIndex?: boolean
  jsonLd?: JsonLd | JsonLd[]
}

const Layout = ({
  strict,
  children,
  onLoad,
  title,
  description,
  url,
  image,
  noIndex = false,
  jsonLd,
}: LayoutProps) => {
  useAnalytics()
  const location = useLocation()
  const privatePaths = [
    '/sign-in', '/sign-up', '/activate', '/forgot-password',
    '/reset-password', '/search', '/checkout', '/checkout-session',
    '/bookings', '/booking', '/settings', '/notifications', '/change-password',
  ]
  const resolvedNoIndex = noIndex || privatePaths.some((path) => (
    location.pathname === path || location.pathname.startsWith(`${path}/`)
  ))

  const { user, userLoaded, unauthorized } = useUserContext() as UserContextType
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = UserService.getCurrentUser()

    if (!currentUser && strict) {
      UserService.signout(true, false)
    } else if (userLoaded) {
      setLoading(false)

      if (onLoad) {
        onLoad(user || undefined)
      }
    }
  }, [user, userLoaded, strict]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleResend = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()

    try {
      if (user) {
        const data = { email: user.email }

        const status = await UserService.resendLink(data)
        if (status === 200) {
          helper.info(strings.VALIDATION_EMAIL_SENT)
        } else {
          helper.error(null, strings.VALIDATION_EMAIL_ERROR)
        }
      }
    } catch (err) {
      helper.error(err, strings.VALIDATION_EMAIL_ERROR)
    }
  }

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        url={url || location.pathname}
        image={image}
        noIndex={resolvedNoIndex}
        jsonLd={jsonLd}
/>

      {
        !(unauthorized && strict) && (
          (!user && !loading) || (user && user.verified) ? (
            <div className="content">{children}</div>
          ) : (
            !loading && (
              <div className="validate-email">
                <span>{strings.VALIDATE_EMAIL}</span>
                <Button type="button" variant="contained" className="btn-primary btn-resend" onClick={handleResend}>
                  {strings.RESEND}
                </Button>
              </div>
            )
          )
        )
      }
      {unauthorized && strict && <Unauthorized />}
    </>
  )
}

export default Layout
