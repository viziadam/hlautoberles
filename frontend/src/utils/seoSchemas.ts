import { absoluteUrl, SITE } from '@/config/site.config'
import type { SeoRoute } from '@/config/seoRoutes'

type JsonLd = Record<string, unknown>

export const localBusinessSchema: JsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AutoRental',
  '@id': `${SITE.url}/#business`,
  name: SITE.name,
  url: SITE.url,
  logo: absoluteUrl(SITE.logo),
  image: absoluteUrl(SITE.defaultImage),
  telephone: SITE.phone,
  email: SITE.email,
  currenciesAccepted: SITE.currenciesAccepted,
  hasMap: SITE.mapUrl,
  address: {
    '@type': 'PostalAddress',
    ...SITE.address,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: SITE.geo.latitude,
    longitude: SITE.geo.longitude,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    telephone: SITE.phone,
    email: SITE.email,
    availableLanguage: ['hu', 'en'],
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'Budapest',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Budapest XI. kerület',
    },
  ],
  ...(SITE.socialProfiles.length > 0
    ? { sameAs: SITE.socialProfiles }
    : {}),
}

export const webSiteSchema: JsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE.url}/#website`,
  name: SITE.name,
  url: SITE.url,
  inLanguage: SITE.schemaLanguage,
  publisher: {
    '@id': `${SITE.url}/#business`,
  },
}

export const webPageSchema = (route: SeoRoute): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${absoluteUrl(route.path)}#webpage`,
  name: route.title,
  description: route.description,
  url: absoluteUrl(route.path),
  inLanguage: SITE.schemaLanguage,
  isPartOf: {
    '@id': `${SITE.url}/#website`,
  },
})

export const serviceSchema = (route: SeoRoute): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${absoluteUrl(route.path)}#service`,
  name: route.schema.serviceName || route.title,
  description: route.schema.serviceDescription || route.description,
  serviceType: route.schema.serviceName || route.title,
  inLanguage: SITE.schemaLanguage,
  areaServed: {
    '@type': 'City',
    name: 'Budapest',
  },
  provider: {
    '@id': `${SITE.url}/#business`,
  },
  url: absoluteUrl(route.path),
})

export const buildStructuredData = (route?: SeoRoute): JsonLd[] | undefined => {
  if (!route) {
    return undefined
  }

  const schemas: JsonLd[] = [
    webPageSchema(route),
  ]

  if (route.path === '/') {
    schemas.unshift(localBusinessSchema, webSiteSchema)
    return schemas
  }

  if (route.schema.kind === 'business') {
    schemas.unshift(localBusinessSchema)
  }

  if (route.schema.kind === 'service') {
    schemas.unshift(localBusinessSchema, serviceSchema(route))
  }

  return schemas
}
