import rawConfig from './seoRoutes.json'

export type SeoSchemaKind = 'business' | 'service' | 'webPage'

export interface SeoSchemaConfig {
  kind: SeoSchemaKind
  serviceName?: string
  serviceDescription?: string
}

export interface SeoRoute {
  path: string
  title: string
  description: string
  index: boolean
  sitemap: boolean
  ogType: 'website' | 'article'
  preloadImage?: string
  schema: SeoSchemaConfig
}

export interface SeoSite {
  url: string
  name: string
  htmlLanguage: string
  schemaLanguage: string
  locale: string
  defaultImage: string
  logo: string
  phone: string
  email: string
  mapUrl: string
  currenciesAccepted: string
  address: {
    streetAddress: string
    addressLocality: string
    postalCode: string
    addressCountry: string
  }
  geo: {
    latitude: number
    longitude: number
  }
  socialProfiles: string[]
}

export interface SeoConfig {
  site: SeoSite
  routes: SeoRoute[]
  privateRoutes: string[]
  privateRoutePrefixes: string[]
  redirects: Array<{ from: string, to: string }>
  notFound: {
    title: string
    description: string
  }
}

export const SEO_CONFIG = rawConfig as SeoConfig
export const SEO_ROUTES = SEO_CONFIG.routes

const normalizePath = (path: string) => {
  if (path === '/') {
    return '/'
  }

  return `/${path.replace(/^\/+|\/+$/g, '')}`
}

const routeMap = new Map(
  SEO_ROUTES.map((route) => [normalizePath(route.path), route]),
)

export const getSeoRoute = (pathname: string) => (
  routeMap.get(normalizePath(pathname))
)

export const getIndexableSeoRoutes = () => (
  SEO_ROUTES.filter((route) => route.index && route.sitemap)
)

export const isPrivateSeoPath = (pathname: string) => {
  const normalized = normalizePath(pathname)

  if (SEO_CONFIG.privateRoutes.includes(normalized)) {
    return true
  }

  return SEO_CONFIG.privateRoutePrefixes.some((prefix) => (
    normalized.startsWith(prefix)
  ))
}

export const getFullSeoTitle = (title?: string) => (
  title
    ? `${title} | ${SEO_CONFIG.site.name}`
    : SEO_CONFIG.site.name
)
