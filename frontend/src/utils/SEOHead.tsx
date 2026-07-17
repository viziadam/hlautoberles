import { useEffect } from 'react'
import { absoluteUrl, SITE } from '@/config/site.config'
import { getFullSeoTitle } from '@/config/seoRoutes'

type JsonLd = Record<string, unknown>

interface SEOHeadProps {
  title?: string
  description?: string
  url?: string
  image?: string
  noIndex?: boolean
  noFollow?: boolean
  type?: 'website' | 'article'
  jsonLd?: JsonLd | JsonLd[]
}

const upsertMeta = (
  attribute: 'name' | 'property',
  key: string,
  value: string,
) => {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  )

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.content = value
}

const upsertCanonical = (href: string) => {
  let canonical = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  )

  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    document.head.appendChild(canonical)
  }

  canonical.href = href
}

const SEOHead = ({
  title,
  description = SITE.defaultDescription,
  url = '/',
  image = SITE.defaultImage,
  noIndex = false,
  noFollow = false,
  type = 'website',
  jsonLd,
}: SEOHeadProps) => {
  const fullTitle = getFullSeoTitle(title)
  const canonicalUrl = absoluteUrl(url)
  const imageUrl = absoluteUrl(image)

  useEffect(() => {
    document.title = fullTitle

    upsertMeta('name', 'description', description)
    upsertMeta(
      'name',
      'robots',
      noIndex
        ? `noindex, ${noFollow ? 'nofollow' : 'follow'}`
        : 'index, follow, max-image-preview:large',
    )

    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', canonicalUrl)
    upsertMeta('property', 'og:image', imageUrl)
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:site_name', SITE.name)
    upsertMeta('property', 'og:locale', SITE.locale)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', imageUrl)

    upsertCanonical(canonicalUrl)

    const scriptId = 'page-structured-data'
    document.getElementById(scriptId)?.remove()

    if (jsonLd) {
      const script = document.createElement('script')
      script.id = scriptId
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(jsonLd)
      document.head.appendChild(script)
    }

    return () => {
      document.getElementById(scriptId)?.remove()
    }
  }, [
    canonicalUrl,
    description,
    fullTitle,
    imageUrl,
    jsonLd,
    noFollow,
    noIndex,
    type,
  ])

  return null
}

export default SEOHead
