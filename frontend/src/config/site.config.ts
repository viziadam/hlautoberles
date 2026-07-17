import { SEO_CONFIG } from './seoRoutes'

const configuredSiteUrl = String(
  import.meta.env.VITE_PUBLIC_SITE_URL || SEO_CONFIG.site.url,
).replace(/\/+$/, '')

export const SITE = {
  ...SEO_CONFIG.site,
  url: configuredSiteUrl,

  defaultTitle:
    `Autóbérlés, teherautó- és szerszámkölcsönzés Budapesten | ${SEO_CONFIG.site.name}`,

  defaultDescription:
    SEO_CONFIG.routes.find((route) => route.path === '/')?.description || '',
} as const

export const absoluteUrl = (path = '/') => {
  if (/^https?:\/\//i.test(path)) {
    return path
  }

  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`
}
