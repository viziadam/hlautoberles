// import React from 'react'
// import { strings } from '@/lang/tos'
// import Layout from '@/components/Layout'
// import Footer from '@/components/Footer'

// import '@/assets/css/tos.css'

// const ToS = () => {
//   const onLoad = () => { }

//   return (
//     <Layout onLoad={onLoad} strict={false} title="Általános szerződési feltételek" url="/tos">
//       <div className="tos">
//         <h1>{strings.TITLE}</h1>
//         <p>{strings.TOS}</p>
//       </div>
//       <Footer />
//     </Layout>
//   )
// }

// export default ToS

import React from 'react'
import { Button } from '@mui/material'
import {
  Description,
  Download,
  Gavel,
  InfoOutlined,
  OpenInNew,
  PictureAsPdf,
} from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import { strings } from '@/lang/tos'
import Layout from '@/components/Layout'
import Footer from '@/components/Footer'

import '@/assets/css/tos.css'

const PDF_PATH = '/documents/gepjarmu-berleti-szerzodes.pdf'
const WORD_PATH = '/documents/gepjarmu-berleti-szerzodes.docx'

const ToS = () => {
  const onLoad = () => {}

  const rules = [
    {
      title: strings.RULE_1_TITLE,
      body: strings.RULE_1_BODY,
    },
    {
      title: strings.RULE_2_TITLE,
      body: strings.RULE_2_BODY,
    },
    {
      title: strings.RULE_3_TITLE,
      body: strings.RULE_3_BODY,
    },
    {
      title: strings.RULE_4_TITLE,
      body: strings.RULE_4_BODY,
    },
    {
      title: strings.RULE_5_TITLE,
      body: strings.RULE_5_BODY,
    },
    {
      title: strings.RULE_6_TITLE,
      body: strings.RULE_6_BODY,
    },
    {
      title: strings.RULE_7_TITLE,
      body: strings.RULE_7_BODY,
    },
    {
      title: strings.RULE_8_TITLE,
      body: strings.RULE_8_BODY,
    },
    {
      title: strings.RULE_9_TITLE,
      body: strings.RULE_9_BODY,
    },
    {
      title: strings.RULE_10_TITLE,
      body: strings.RULE_10_BODY,
    },
    {
      title: strings.RULE_11_TITLE,
      body: strings.RULE_11_BODY,
    },
  ]

  const getPublicDocumentUrl = (filename: string) => (
  `${import.meta.env.BASE_URL}documents/${filename}`
)

const PDF_PATH = getPublicDocumentUrl(
  'gepjarmu-berleti-szerzodes.pdf',
)

const WORD_PATH = getPublicDocumentUrl(
  'gepjarmu-berleti-szerzodes.docx',
)

  return (
    <Layout
      onLoad={onLoad}
      strict={false}
      title={strings.SEO_TITLE}
      description={strings.SEO_DESCRIPTION}
      url="/tos"
    >
      <main className="rental-terms-page">
        <header className="rental-terms-hero">
          <div className="rental-terms-hero-icon" aria-hidden="true">
            <Gavel />
          </div>

          <div className="rental-terms-hero-content">
            <span className="rental-terms-eyebrow">
              {strings.EYEBROW}
            </span>

            <h1>{strings.TITLE}</h1>
            <p>{strings.INTRO}</p>
          </div>
        </header>

        <section
          className="rental-documents"
          aria-labelledby="rental-documents-title"
        >
          <header className="rental-section-heading">
            <h2 id="rental-documents-title">
              {strings.DOCUMENTS_TITLE}
            </h2>

            <p>{strings.DOCUMENTS_TEXT}</p>
          </header>

          <div className="rental-document-grid">
            <article className="rental-document-card">
              <div
                className="rental-document-icon rental-document-icon-pdf"
                aria-hidden="true"
              >
                <PictureAsPdf />
              </div>

              <div className="rental-document-content">
                <span className="rental-document-format">PDF</span>
                <h3>{strings.PDF_TITLE}</h3>
                <p>{strings.PDF_DESCRIPTION}</p>

                <div className="rental-document-actions">
                  <Button
                    component="a"
                    href={PDF_PATH}
                    download="gepjarmu-berleti-szerzodes.pdf"
                    variant="contained"
                    disableElevation
                    className="btn-primary rental-download-button"
                    startIcon={<Download />}
                  >
                    {strings.PDF_DOWNLOAD}
                  </Button>

                  <Button
                    component="a"
                    href={PDF_PATH}
                    target="_blank"
                    rel="noopener noreferrer"
                    type="application/pdf"
                    variant="outlined"
                    className="rental-open-button"
                    startIcon={<OpenInNew />}
                  >
                    {strings.PDF_OPEN}
                  </Button>
                </div>
              </div>
            </article>

            <article className="rental-document-card">
              <div
                className="rental-document-icon rental-document-icon-word"
                aria-hidden="true"
              >
                <Description />
              </div>

              <div className="rental-document-content">
                <span className="rental-document-format">DOCX</span>
                <h3>{strings.WORD_TITLE}</h3>
                <p>{strings.WORD_DESCRIPTION}</p>

                <div className="rental-document-actions">
                  <Button
                    component="a"
                    href={WORD_PATH}
                    download
                    variant="contained"
                    disableElevation
                    className="btn-primary rental-download-button"
                    startIcon={<Download />}
                  >
                    {strings.WORD_DOWNLOAD}
                  </Button>
                </div>
              </div>
            </article>
          </div>
        </section>

        <aside className="rental-terms-notice">
          <InfoOutlined aria-hidden="true" />

          <div>
            <h2>{strings.NOTICE_TITLE}</h2>
            <p>{strings.NOTICE_TEXT}</p>
          </div>
        </aside>

        <section
          className="rental-rules"
          aria-labelledby="rental-rules-title"
        >
          <header className="rental-section-heading">
            <span className="rental-section-eyebrow">
              {strings.RULES_EYEBROW}
            </span>

            <h2 id="rental-rules-title">
              {strings.RULES_TITLE}
            </h2>

            <p>{strings.RULES_INTRO}</p>
          </header>

          <div className="rental-rules-list">
            {rules.map((rule, index) => (
              <article
                className="rental-rule"
                id={`berleti-feltetel-${index + 1}`}
                key={rule.title}
              >
                <div
                  className="rental-rule-number"
                  aria-hidden="true"
                >
                  {index + 1}
                </div>

                <div className="rental-rule-content">
                  <h3>{rule.title}</h3>
                  <p>{rule.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rental-contract-contact">
          <div>
            <h2>{strings.CONTACT_TITLE}</h2>
            <p>{strings.CONTACT_TEXT}</p>
          </div>

          <Button
            component={RouterLink}
            to="/contact"
            variant="contained"
            disableElevation
            className="btn-primary rental-contact-button"
          >
            {strings.CONTACT_BUTTON}
          </Button>
        </section>
      </main>

      <Footer />
    </Layout>
  )
}

export default ToS
