import React, { useState } from 'react'
import * as bookcarsTypes from ':bookcars-types'
import Layout from '@/components/Layout'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import { SITE } from '@/config/site.config'
import { localBusinessSchema } from '@/utils/seoSchemas'

import '@/assets/css/contact.css'

const Contact = () => {
  const [user, setUser] = useState<bookcarsTypes.User>()

  const onLoad = (_user?: bookcarsTypes.User) => {
    setUser(_user)
  }

  return (
    <Layout
      onLoad={onLoad}
      strict={false}
      title="Kapcsolat és járműátvétel"
      description="Kapcsolatfelvétel a HLAutóbérléssel. Jármű- és eszközátvétel Budapest XI. kerületében, a Galvani utcában."
      url="/contact"
      jsonLd={localBusinessSchema}
    >
      <main className="contact">
        <section className="contact-details">
          <p className="eyebrow">Segítünk a választásban</p>
          <h1>Kapcsolat – HLAutóbérlés</h1>
          <p>
            Autó-, teherautó- vagy szerszámbérléssel kapcsolatban telefonon,
            e-mailben vagy az űrlapon keresztül érhetsz el bennünket.
          </p>

          <address>
            <strong>{SITE.name}</strong><br />
            {SITE.address.postalCode} {SITE.address.addressLocality},{' '}
            {SITE.address.streetAddress}<br />
            Telefon: <a href={`tel:${SITE.phone}`}>{SITE.phone}</a><br />
            E-mail: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </address>

          <h2>Átvétel a XI. kerületben</h2>
          <p>
            A járművek és eszközök átvételének pontos időpontját a foglalás
            visszaigazolásakor egyeztetjük.
          </p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=1117%20Budapest%20Galvani%20utca%201-3"
            target="_blank"
            rel="noreferrer"
          >
            Cím megnyitása térképen
          </a>
        </section>
        <ContactForm user={user} className="form" />
      </main>
      <Footer />
    </Layout>
  )
}

export default Contact
