const siteUrl = String(
  import.meta.env.VITE_PUBLIC_SITE_URL || 'https://hlautoberles.hu'
).replace(/\/+$/, '')

export const SITE = {
  url: siteUrl,

  name: 'HLAutóbérlés',

  defaultTitle:
    'Autóbérlés, teherautó- és szerszámkölcsönzés Budapesten | HLAutóbérlés',

  defaultDescription:
    'Személyautók, kisteherautók, teherautók és professzionális szerszámok bérlése Budapest XI. kerületében. Átlátható feltételek és egyszerű online foglalás.',

  phone: '+36309719513',
  email: 'info@hlautoberles.hu',

  address: {
    streetAddress: 'Galvani utca 1–3.',
    addressLocality: 'Budapest',
    postalCode: '1117',
    addressCountry: 'HU',
  },

  geo: {
    latitude: 47.465,
    longitude: 19.049,
  },

  defaultImage: '/cover.webp',

  socialProfiles: [
    // A kliens valós profiljai kerüljenek ide.
    // 'https://www.facebook.com/...',
    // 'https://www.instagram.com/...',
  ],
} as const

export const absoluteUrl = (path = '/') => {
  if (/^https?:\/\//i.test(path)) {
    return path
  }

  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`
}
