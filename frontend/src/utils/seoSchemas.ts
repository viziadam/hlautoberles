import { absoluteUrl, SITE } from '@/config/site.config'

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'AutoRental',
  '@id': `${SITE.url}/#business`,
  name: SITE.name,
  url: SITE.url,
  logo: absoluteUrl('/favicon.png'),
  image: absoluteUrl(SITE.defaultImage),
  telephone: SITE.phone,
  email: SITE.email,
  address: { '@type': 'PostalAddress', ...SITE.address },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: SITE.geo.latitude,
    longitude: SITE.geo.longitude,
  },
  areaServed: [
    { '@type': 'City', name: 'Budapest' },
    { '@type': 'AdministrativeArea', name: 'Budapest XI. kerület' },
  ],
  sameAs: SITE.socialProfiles,
}

export const serviceSchema = (name: string, serviceType: string, path: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  serviceType,
  areaServed: { '@type': 'City', name: 'Budapest' },
  provider: { '@id': `${SITE.url}/#business` },
  url: absoluteUrl(path),
})
