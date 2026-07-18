// import React, { useState } from 'react'
// import * as bookcarsTypes from ':bookcars-types'
// import Layout from '@/components/Layout'
// import ContactForm from '@/components/ContactForm'
// import Footer from '@/components/Footer'
// import { SITE } from '@/config/site.config'

// import { sendEvent } from '@/utils/ga4'

// import '@/assets/css/contact.css'

// const Contact = () => {
//   const [user, setUser] = useState<bookcarsTypes.User>()

//   const onLoad = (_user?: bookcarsTypes.User) => {
//     setUser(_user)
//   }

//   return (
//     <Layout
//       onLoad={onLoad}
//       strict={false}
//     >
//       <main className="contact">
//         <section className="contact-details">
//           <p className="eyebrow">Segítünk a választásban</p>
//           <h1>Kapcsolat – HLAutóbérlés</h1>
//           <p>
//             Autó-, teherautó- vagy szerszámbérléssel kapcsolatban telefonon,
//             e-mailben vagy az űrlapon keresztül érhetsz el bennünket.
//           </p>

//           <address>
//             <strong>{SITE.name}</strong><br />
//             {SITE.address.postalCode} {SITE.address.addressLocality},{' '}
//             {SITE.address.streetAddress}<br />
//             Telefon: <a
//                       href={`tel:${SITE.phone}`}
//                       onClick={() => {
//                         sendEvent('phone_click', {
//                           link_location: 'contact_page',
//                         })
//                       }}
//                     >
//                       {SITE.phone}
//                     </a><br />
//             E-mail: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
//           </address>

//           <h2>Átvétel a XI. kerületben</h2>
//           <p>
//             A járművek és eszközök átvételének pontos időpontját a foglalás
//             visszaigazolásakor egyeztetjük.
//           </p>
//           <a
//             href={SITE.mapUrl}
//             target="_blank"
//             rel="noreferrer"
//             onClick={() => {
//               sendEvent('map_click', {
//                 link_location: 'contact_page',
//               })
//             }}
//           >
//             Cím megnyitása térképen
//           </a>
//         </section>
//         <ContactForm user={user} className="form" />
//       </main>
//       <Footer />
//     </Layout>
//   )
// }

// export default Contact


import React, { useState } from 'react'
import * as bookcarsTypes from ':bookcars-types'

import Layout from '@/components/Layout'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'

import { SITE } from '@/config/site.config'
import { strings } from '@/lang/contact'
import { sendEvent } from '@/utils/ga4'

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
    >
      <main className="contact">
        <section
          className="contact-details"
          aria-labelledby="contact-page-title"
        >
          <p className="eyebrow">
            {strings.EYEBROW}
          </p>

          <h1 id="contact-page-title">
            {strings.TITLE}
          </h1>

          <p>
            {strings.INTRO}
          </p>

          <address>
            <strong>{SITE.name}</strong>
            <br />

            {SITE.address.postalCode}{' '}
            {SITE.address.addressLocality},{' '}
            {SITE.address.streetAddress}

            {SITE.phone && (
              <>
                <br />

                {strings.PHONE}:{' '}

                <a
                  href={`tel:${SITE.phoneLink}`}
                  aria-label={
                    `${strings.PHONE_ARIA_LABEL}: ${SITE.phone}`
                  }
                  onClick={() => {
                    sendEvent('phone_click', {
                      link_location: 'contact_page',
                    })
                  }}
                >
                  {SITE.phone}
                </a>
              </>
            )}

            {SITE.email && (
              <>
                <br />

                {strings.EMAIL}:{' '}

                <a
                  href={`mailto:${SITE.email}`}
                  aria-label={
                    `${strings.EMAIL_ARIA_LABEL}: ${SITE.email}`
                  }
                  onClick={() => {
                    sendEvent('email_click', {
                      link_location: 'contact_page',
                    })
                  }}
                >
                  {SITE.email}
                </a>
              </>
            )}
          </address>

          <h2>
            {strings.PICKUP_TITLE}
          </h2>

          <p>
            {strings.PICKUP_DESCRIPTION}
          </p>

          {SITE.mapUrl && (
            <a
              href={SITE.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                sendEvent('map_click', {
                  link_location: 'contact_page',
                })
              }}
            >
              {strings.OPEN_MAP}
            </a>
          )}
        </section>

        <ContactForm
          user={user}
          className="form"
        />
      </main>

      <Footer />
    </Layout>
  )
}

export default Contact
