import env from './env.config'
import { SEO_CONFIG } from './seoRoutes'

const normalizeUrl = (value: string) => (
  value.replace(/\/+$/, '')
)

const normalizePhoneLink = (value: string) => (
  value.replace(/[^\d+]/g, '')
)

const configuredSiteUrl = normalizeUrl(
  env.PUBLIC_SITE_URL || SEO_CONFIG.site.url,
)

export const SITE = {
  ...SEO_CONFIG.site,

  url: configuredSiteUrl,
  name: env.WEBSITE_NAME,

  phone: env.CONTACT_PHONE,
  phoneLink: normalizePhoneLink(env.CONTACT_PHONE),

  email: env.CONTACT_EMAIL,
  mapUrl: env.COMPANY_MAP_URL,
  controller: {
    legalName: env.CONTROLLER_LEGAL_NAME,
    address: env.CONTROLLER_ADDRESS,
  },

  address: {
    streetAddress: env.COMPANY_STREET_ADDRESS,
    addressLocality: env.COMPANY_CITY,
    postalCode: env.COMPANY_POSTAL_CODE,
    addressCountry: env.COMPANY_COUNTRY,
  },

  geo: {
    latitude: env.MAP_LATITUDE,
    longitude: env.MAP_LONGITUDE,
  },

  defaultTitle:
    `Autóbérlés, teherautó- és szerszámkölcsönzés Budapesten | ${env.WEBSITE_NAME}`,

  defaultDescription:
    SEO_CONFIG.routes.find(
      (route) => route.path === '/',
    )?.description || '',
} as const

export const absoluteUrl = (path = '/') => {
  if (/^https?:\/\//i.test(path)) {
    return path
  }

  return (
    `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`
  )
}
