import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Layout from '@/components/Layout'
import Footer from '@/components/Footer'
import { SITE } from '@/config/site.config'
import '@/assets/css/service-page.css'

export interface ServiceLandingProps {
  path: string
  title: string
  metaDescription: string
  serviceType: string
  intro: string
  sections: Array<{
    title: string
    paragraphs?: string[]
    items?: string[]
  }>
}

const ServiceLanding = ({
  path,
  title,
  metaDescription,
  intro,
  sections,
}: ServiceLandingProps) => (
  <Layout
    strict={false}
    title={title}
    description={metaDescription}
    url={path}
  >
    <main className="service-page">
      <nav aria-label="Morzsamenü" className="breadcrumb">
        <RouterLink to="/">Főoldal</RouterLink>
        <span aria-hidden="true"> / </span>
        <span>{title}</span>
      </nav>

      <header className="service-hero">
        <p className="eyebrow">HLAutóbérlés · Budapest XI. kerület</p>
        <h1>{title}</h1>
        <p className="lead">{intro}</p>
        <RouterLink className="btn-primary service-cta" to="/">
          Elérhető járművek és eszközök keresése
        </RouterLink>
      </header>

      <div className="service-sections">
        {sections.map((section) => (
          <section key={section.title} className="service-section">
            <h2>{section.title}</h2>
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.items && (
              <ul>
                {section.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            )}
          </section>
        ))}

        <section className="service-section service-location">
          <h2>Átvétel és kapcsolat</h2>
          <p>
            Az átvétel helye: {SITE.address.postalCode} {SITE.address.addressLocality},{' '}
            {SITE.address.streetAddress} A részleteket minden foglalásnál előre egyeztetjük.
          </p>
          <RouterLink to="/contact">Kapcsolatfelvétel</RouterLink>
        </section>
      </div>
    </main>
    <Footer />
  </Layout>
)

export default ServiceLanding
