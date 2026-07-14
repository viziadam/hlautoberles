import React from 'react'
import { Button } from '@mui/material'
import {
  Construction,
  Handyman,
  Hardware,
  Straighten,
} from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import Layout from '@/components/Layout'
import Footer from '@/components/Footer'
import { localBusinessSchema, serviceSchema } from '@/utils/seoSchemas'
import '@/assets/css/tools.css'

const toolGroups = [
  {
    title: 'Behajtók és kéziszerszámok',
    description:
      'Kézi és akkumulátoros behajtók szerelési, építési és otthoni munkákhoz.',
    icon: <Handyman className="tool-card-icon" aria-hidden="true" />,
  },
  {
    title: 'Vágó- és csiszológépek',
    description:
      'Sarokcsiszolók és egyéb munkavégzést segítő elektromos szerszámok.',
    icon: <Construction className="tool-card-icon" aria-hidden="true" />,
  },
  {
    title: 'Létrák és fellépők',
    description:
      'Fa- és alumínium létrák, valamint különböző magasságú fellépők.',
    icon: <Straighten className="tool-card-icon" aria-hidden="true" />,
  },
  {
    title: 'Állványok és kiegészítők',
    description:
      'Munkavégzéshez használható állványok és kapcsolódó kiegészítő eszközök.',
    icon: <Hardware className="tool-card-icon" aria-hidden="true" />,
  },
]

const ToolRentalBudapest = () => (
  <Layout
    strict={false}
    title="Szerszámkölcsönzés Budapest XI. kerületében"
    description="Professzionális szerszámok, behajtók, sarokcsiszolók, létrák, fellépők és állványok kölcsönzése Budapest XI. kerületében."
    url="/szerszamkolcsonzes-budapest"
    jsonLd={[
      localBusinessSchema,
      serviceSchema(
        'Szerszámkölcsönzés Budapest XI. kerületében',
        'Szerszámok és munkavégzést segítő eszközök kölcsönzése',
        '/szerszamkolcsonzes-budapest',
      ),
    ]}
  >
    <main className="tools-page">
      <header className="tools-hero">
        <p className="tools-eyebrow">
          HLAutóbérlés · Budapest XI. kerület
        </p>

        <h1>Szerszámkölcsönzés Budapesten</h1>

        <p>
          Nem szükséges minden munkához külön gépet vagy eszközt vásárolni.
          Bérelj professzionális szerszámokat a szükséges időszakra,
          közvetlen egyeztetéssel.
        </p>
      </header>

      <section
        className="tools-catalog"
        aria-labelledby="tools-catalog-title"
      >
        <h2 id="tools-catalog-title">
          Bérelhető szerszámok és eszközök
        </h2>

        <div className="tools-grid">
          {toolGroups.map((tool) => (
            <article className="tool-card" key={tool.title}>
              <div className="tool-card-icon-wrapper">
                {tool.icon}
              </div>

              <h3>{tool.title}</h3>
              <p>{tool.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="tools-information">
        <div>
          <h2>Aktuális elérhetőség</h2>

          <p>
            Az elérhető típusok, mennyiségek, bérlési időszakok és árak
            változhatnak. Foglalás előtt kérj tájékoztatást az aktuális
            készletről.
          </p>
        </div>

        <Button
          component={RouterLink}
          to="/contact"
          variant="contained"
          className="btn-primary tools-contact-button"
          disableElevation
        >
          Érdeklődés szerszámbérlésről
        </Button>
      </section>
    </main>

    <Footer />
  </Layout>
)

export default ToolRentalBudapest
