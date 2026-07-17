import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const currentFile = fileURLToPath(import.meta.url)
const scriptsDir = path.dirname(currentFile)
const frontendDir = path.resolve(scriptsDir, '..')
const buildDir = path.join(frontendDir, 'build')
const generatedDir = path.join(frontendDir, 'generated')
const configPath = path.join(
  frontendDir,
  'src',
  'config',
  'seoRoutes.json',
)

const START_MARKER_HTML = (
  '<meta id="seo-head-start" '
  + 'name="seo-head-start" content="" />'
)


const END_MARKER_HTML = (
  '<meta id="seo-head-end" '
  + 'name="seo-head-end" content="" />'
)

const START_MARKER_REGEX = (
  /<meta\b[^>]*\bid=["']seo-head-start["'][^>]*>/i
)

const END_MARKER_REGEX = (
  /<meta\b[^>]*\bid=["']seo-head-end["'][^>]*>/i
)

const config = JSON.parse(await fs.readFile(configPath, 'utf8'))
const templatePath = path.join(buildDir, 'index.html')
const template = await fs.readFile(templatePath, 'utf8')

const templateStartMarker = template.match(
  START_MARKER_REGEX,
)

const templateEndMarker = template.match(
  END_MARKER_REGEX,
)

if (
  !templateStartMarker
  || templateStartMarker.index === undefined
  || !templateEndMarker
  || templateEndMarker.index === undefined
  || templateEndMarker.index <= templateStartMarker.index
) {
  throw new Error(
    'SEO head marker elements are missing '
    + 'from the built index.html.',
  )
}

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')

const escapeXml = escapeHtml

const safeJson = (value) => JSON.stringify(value)
  .replaceAll('<', '\\u003c')

const normalizeSiteUrl = (value) => String(value).replace(/\/+$/, '')
const siteUrl = normalizeSiteUrl(config.site.url)

const absoluteUrl = (value = '/') => {
  if (/^https?:\/\//i.test(value)) {
    return value
  }

  return `${siteUrl}${value.startsWith('/') ? value : `/${value}`}`
}

const fullTitle = (title) => (
  title
    ? `${title} | ${config.site.name}`
    : config.site.name
)

const businessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'AutoRental',
  '@id': `${siteUrl}/#business`,
  name: config.site.name,
  url: siteUrl,
  logo: absoluteUrl(config.site.logo),
  image: absoluteUrl(config.site.defaultImage),
  telephone: config.site.phone,
  email: config.site.email,
  currenciesAccepted: config.site.currenciesAccepted,
  hasMap: config.site.mapUrl,
  address: {
    '@type': 'PostalAddress',
    ...config.site.address,
  },
  geo: {
    '@type': 'GeoCoordinates',
    ...config.site.geo,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    telephone: config.site.phone,
    email: config.site.email,
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
  ...(config.site.socialProfiles.length > 0
    ? { sameAs: config.site.socialProfiles }
    : {}),
})

const webSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  name: config.site.name,
  url: siteUrl,
  inLanguage: config.site.schemaLanguage,
  publisher: {
    '@id': `${siteUrl}/#business`,
  },
})

const webPageSchema = (route) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${absoluteUrl(route.path)}#webpage`,
  name: route.title,
  description: route.description,
  url: absoluteUrl(route.path),
  inLanguage: config.site.schemaLanguage,
  isPartOf: {
    '@id': `${siteUrl}/#website`,
  },
})

const serviceSchema = (route) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${absoluteUrl(route.path)}#service`,
  name: route.schema.serviceName || route.title,
  description:
    route.schema.serviceDescription || route.description,
  serviceType: route.schema.serviceName || route.title,
  inLanguage: config.site.schemaLanguage,
  areaServed: {
    '@type': 'City',
    name: 'Budapest',
  },
  provider: {
    '@id': `${siteUrl}/#business`,
  },
  url: absoluteUrl(route.path),
})

const schemasForRoute = (route) => {
  const schemas = [webPageSchema(route)]

  if (route.path === '/') {
    return [
      businessSchema(),
      webSiteSchema(),
      ...schemas,
    ]
  }

  if (route.schema.kind === 'business') {
    return [
      businessSchema(),
      ...schemas,
    ]
  }

  if (route.schema.kind === 'service') {
    return [
      businessSchema(),
      serviceSchema(route),
      ...schemas,
    ]
  }

  return schemas
}

const buildHead = ({
  title,
  description,
  robots,
  path: routePath,
  ogType = 'website',
  preloadImage,
  jsonLd,
  canonical = true,
}) => {
  const canonicalUrl = absoluteUrl(routePath)
  const imageUrl = absoluteUrl(config.site.defaultImage)

  return [
    START_MARKER_HTML,
    `<title>${escapeHtml(fullTitle(title))}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<meta name="robots" content="${escapeHtml(robots)}" />`,
    canonical
      ? `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`
      : '',
    `<meta property="og:title" content="${escapeHtml(fullTitle(title))}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    canonical
      ? `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`
      : '',
    `<meta property="og:image" content="${escapeHtml(imageUrl)}" />`,
    `<meta property="og:type" content="${escapeHtml(ogType)}" />`,
    `<meta property="og:site_name" content="${escapeHtml(config.site.name)}" />`,
    `<meta property="og:locale" content="${escapeHtml(config.site.locale)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeHtml(fullTitle(title))}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(imageUrl)}" />`,
    preloadImage
      ? `<link rel="preload" href="${escapeHtml(preloadImage)}" as="image" fetchpriority="high" />`
      : '',
    jsonLd
      ? `<script id="page-structured-data" type="application/ld+json">${safeJson(jsonLd)}</script>`
      : '',
    END_MARKER_HTML,
  ]
    .filter(Boolean)
    .join('\n  ')
}

const applyHead = (html, head) => {
  const startMarker = html.match(
    START_MARKER_REGEX,
  )

  const endMarker = html.match(
    END_MARKER_REGEX,
  )

  if (
    !startMarker
    || startMarker.index === undefined
    || !endMarker
    || endMarker.index === undefined
    || endMarker.index <= startMarker.index
  ) {
    throw new Error(
      'Invalid SEO head marker elements.',
    )
  }

  const startPosition = startMarker.index

  const endPosition = (
    endMarker.index
    + endMarker[0].length
  )

  const replacedHtml = (
    html.slice(0, startPosition)
    + head
    + html.slice(endPosition)
  )

  return replacedHtml.replace(
    /<html(?:\s+lang=["'][^"']*["'])?/i,
    `<html lang="${escapeHtml(
      config.site.htmlLanguage,
    )}"`,
  )
}

const writeRouteShell = async (route) => {
  const robots = route.index
    ? 'index, follow, max-image-preview:large'
    : 'noindex, follow'

  const html = applyHead(
    template,
    buildHead({
      title: route.title,
      description: route.description,
      robots,
      path: route.path,
      ogType: route.ogType,
      preloadImage: route.preloadImage,
      jsonLd: schemasForRoute(route),
    }),
  )

  if (route.path === '/') {
    await fs.writeFile(templatePath, html, 'utf8')
    return
  }

  const outputDirectory = path.join(
    buildDir,
    route.path.replace(/^\/+/, ''),
  )

  await fs.mkdir(outputDirectory, { recursive: true })
  await fs.writeFile(
    path.join(outputDirectory, 'index.html'),
    html,
    'utf8',
  )
}

const writePrivateShell = async () => {
  const rootRoute = config.routes.find(
    (route) => route.path === '/',
  )

  const html = applyHead(
    template,
    buildHead({
      title: config.site.name,
      description: rootRoute.description,
      robots: 'noindex, nofollow',
      path: '/',
      canonical: false,
      jsonLd: undefined,
    }),
  )

  await fs.writeFile(
    path.join(buildDir, '_spa.html'),
    html,
    'utf8',
  )
}

const writeNotFoundShell = async () => {
  const html = applyHead(
    template,
    buildHead({
      title: config.notFound.title,
      description: config.notFound.description,
      robots: 'noindex, nofollow',
      path: '/404',
      canonical: false,
      jsonLd: undefined,
    }),
  )

  await fs.writeFile(
    path.join(buildDir, '404.html'),
    html,
    'utf8',
  )
}

const writeSitemap = async () => {
  const urls = config.routes
    .filter((route) => route.index && route.sitemap)
    .map((route) => {
      const url = route.path === '/'
        ? `${siteUrl}/`
        : absoluteUrl(route.path)

      return [
        '  <url>',
        `    <loc>${escapeXml(url)}</loc>`,
        '  </url>',
      ].join('\n')
    })
    .join('\n')

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>',
    '',
  ].join('\n')

  await fs.writeFile(
    path.join(buildDir, 'sitemap.xml'),
    sitemap,
    'utf8',
  )
}

const nginxEscapeRegex = (value) => (
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
)

const routeLocation = (route) => {
  const target = route.path === '/'
    ? '/index.html'
    : `${route.path}/index.html`

  const noIndexHeader = route.index
    ? ''
    : '  add_header X-Robots-Tag "noindex, follow" always;\n'

  const exact = [
    `location = ${route.path} {`,
    noIndexHeader.trimEnd(),
    `  try_files ${target} =404;`,
    '}',
  ]
    .filter(Boolean)
    .join('\n')

  if (route.path === '/') {
    return exact
  }

  const trailingSlash = [
    `location = ${route.path}/ {`,
    `  return 301 ${route.path}$is_args$args;`,
    '}',
  ].join('\n')

  return `${exact}\n\n${trailingSlash}`
}

const privateLocation = (routePath) => [
  `location = ${routePath} {`,
  '  add_header X-Robots-Tag "noindex, nofollow" always;',
  '  try_files /_spa.html =404;',
  '}',
].join('\n')

const privatePrefixLocation = (prefix) => {
  const escaped = nginxEscapeRegex(prefix)

  return [
    `location ~ ^${escaped}[^/]+/?$ {`,
    '  add_header X-Robots-Tag "noindex, nofollow" always;',
    '  try_files /_spa.html =404;',
    '}',
  ].join('\n')
}

const redirectLocation = ({ from, to }) => [
  `location = ${from} {`,
  `  return 301 ${to}$is_args$args;`,
  '}',
].join('\n')

const writeNginxRoutes = async () => {
  await fs.mkdir(generatedDir, { recursive: true })

  const output = [
    '# Generated by scripts/generate-seo-artifacts.mjs.',
    '# Do not edit manually.',
    '',
    ...config.redirects.map(redirectLocation),
    '',
    ...config.routes.map(routeLocation),
    '',
    ...config.privateRoutes.map(privateLocation),
    '',
    ...config.privateRoutePrefixes.map(privatePrefixLocation),
    '',
    'location = /_spa.html {',
    '  internal;',
    '}',
    '',
  ].join('\n\n')

  await fs.writeFile(
    path.join(generatedDir, 'seo-routes.conf'),
    output,
    'utf8',
  )
}

await fs.rm(generatedDir, {
  recursive: true,
  force: true,
})

for (const route of config.routes) {
  await writeRouteShell(route)
}

await Promise.all([
  writePrivateShell(),
  writeNotFoundShell(),
  writeSitemap(),
  writeNginxRoutes(),
])

console.log(
  `Generated ${config.routes.length} SEO shells, sitemap.xml, 404.html and Nginx routes.`,
)
