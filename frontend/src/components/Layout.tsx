import React, { useEffect, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { Button } from '@mui/material'
import * as bookcarsTypes from ':bookcars-types'
import { strings } from '@/lang/master'
import * as UserService from '@/services/UserService'
import * as helper from '@/utils/helper'
import { useAnalytics } from '@/utils/useAnalytics'
import { useUserContext, type UserContextType } from '@/context/UserContext'
import Unauthorized from '@/components/Unauthorized'
import SEOHead from '@/utils/SEOHead'
import {
  getSeoRoute,
  isPrivateSeoPath,
} from '@/config/seoRoutes'
import { buildStructuredData } from '@/utils/seoSchemas'

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
  noFollow?: boolean
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
  noFollow = false,
  jsonLd,
}: LayoutProps) => {
  useAnalytics()

  const location = useLocation()
  const routeSeo = getSeoRoute(location.pathname)
  const privateRoute = isPrivateSeoPath(location.pathname)

  const resolvedTitle = routeSeo?.title || title
  const resolvedDescription = routeSeo?.description || description
  const resolvedUrl = routeSeo?.path || url || location.pathname
  const resolvedImage = image
  const resolvedNoIndex = noIndex || privateRoute || routeSeo?.index === false
  const resolvedNoFollow = noFollow || privateRoute
  const resolvedJsonLd = routeSeo
    ? buildStructuredData(routeSeo)
    : jsonLd

  const { user, userLoaded, unauthorized } = (
    useUserContext() as UserContextType
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = UserService.getCurrentUser()

    if (!currentUser && strict) {
      UserService.signout(true, false)
    } else if (userLoaded) {
      setLoading(false)
      onLoad?.(user || undefined)
    }
  }, [user, userLoaded, strict]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleResend = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()

    try {
      if (!user) {
        return
      }

      const status = await UserService.resendLink({
        email: user.email,
      })

      if (status === 200) {
        helper.info(strings.VALIDATION_EMAIL_SENT)
      } else {
        helper.error(null, strings.VALIDATION_EMAIL_ERROR)
      }
    } catch (error) {
      helper.error(error, strings.VALIDATION_EMAIL_ERROR)
    }
  }

  return (
    <>
      <SEOHead
        title={resolvedTitle}
        description={resolvedDescription}
        url={resolvedUrl}
        image={resolvedImage}
        noIndex={resolvedNoIndex}
        noFollow={resolvedNoFollow}
        type={routeSeo?.ogType}
        jsonLd={resolvedJsonLd}
      />

      {
        !(unauthorized && strict) && (
          (!user && !loading) || (user && user.verified) ? (
            <div
              className="content"
              data-clarity-mask={privateRoute ? 'true' : undefined}
            >
              {children}
            </div>
          ) : (
            !loading && (
              <div className="validate-email">
                <span>{strings.VALIDATE_EMAIL}</span>
                <Button
                  type="button"
                  variant="contained"
                  className="btn-primary btn-resend"
                  onClick={handleResend}
                >
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
