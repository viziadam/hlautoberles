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
import '@/assets/css/tools.css'
import { strings } from '@/lang/tool-rental'

// const toolGroups = [
//   {
//     title: 'Behajtók és kéziszerszámok',
//     description:
//       'Kézi és akkumulátoros behajtók szerelési, építési és otthoni munkákhoz.',
//     icon: <Handyman className="tool-card-icon" aria-hidden="true" />,
//   },
//   {
//     title: 'Vágó- és csiszológépek',
//     description:
//       'Sarokcsiszolók és egyéb munkavégzést segítő elektromos szerszámok.',
//     icon: <Construction className="tool-card-icon" aria-hidden="true" />,
//   },
//   {
//     title: 'Létrák és fellépők',
//     description:
//       'Fa- és alumínium létrák, valamint különböző magasságú fellépők.',
//     icon: <Straighten className="tool-card-icon" aria-hidden="true" />,
//   },
//   {
//     title: 'Állványok és kiegészítők',
//     description:
//       'Munkavégzéshez használható állványok és kapcsolódó kiegészítő eszközök.',
//     icon: <Hardware className="tool-card-icon" aria-hidden="true" />,
//   },
// ]



const ToolRentalBudapest = () => {
  const toolGroups = [
    {
      title: strings.DRIVERS_TITLE,
      description: strings.DRIVERS_DESCRIPTION,
      icon: <Handyman className="tool-card-icon" aria-hidden="true" />,
    },
    {
      title: strings.GRINDERS_TITLE,
      description: strings.GRINDERS_DESCRIPTION,
      icon: <Construction className="tool-card-icon" aria-hidden="true" />,
    },
    {
      title: strings.LADDERS_TITLE,
      description: strings.LADDERS_DESCRIPTION,
      icon: <Straighten className="tool-card-icon" aria-hidden="true" />,
    },
    {
      title: strings.SCAFFOLDING_TITLE,
      description: strings.SCAFFOLDING_DESCRIPTION,
      icon: <Hardware className="tool-card-icon" aria-hidden="true" />,
    },
  ]

  return (
  <Layout
    strict={false}
  >
    <main className="tools-page">
      <header className="tools-hero">
        <p className="tools-eyebrow">{strings.EYEBROW}</p>
        <h1>{strings.TITLE}</h1>
        <p>{strings.INTRO}</p>
      </header>

      <section
        className="tools-catalog"
        aria-labelledby="tools-catalog-title"
      >
        <h2 id="tools-catalog-title">
          {strings.CATALOG_TITLE}
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
          <h2>{strings.AVAILABILITY_TITLE}</h2>
          <p>{strings.AVAILABILITY_TEXT}</p>
        </div>

        <Button
          component={RouterLink}
          to="/contact"
          variant="contained"
          className="btn-primary tools-contact-button"
          disableElevation
        >
          {strings.CONTACT_BUTTON}
        </Button>
      </section>
    </main>

    <Footer />
  </Layout>
)
}

export default ToolRentalBudapest
