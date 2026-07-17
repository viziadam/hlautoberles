import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Button } from '@mui/material'
import { strings as commonStrings } from '@/lang/common'
import { strings } from '@/lang/no-match'
import Layout from '@/components/Layout'
import SEOHead from '@/utils/SEOHead'

interface NoMatchProps {
  hideHeader?: boolean
}

const NoMatch = ({ hideHeader }: NoMatchProps) => {
  const content = (
    <main className="msg">
      <h1>{strings.NO_MATCH}</h1>
      <p>A keresett oldal nem létezik, vagy már nem érhető el.</p>
      <p>
        <Button component={RouterLink} to="/" variant="text" className="btn-lnk">
          {commonStrings.GO_TO_HOME}
        </Button>
      </p>
    </main>
  )

  return hideHeader ? (
    <>
      <SEOHead title="Az oldal nem található" url={window.location.pathname} noIndex noFollow />
      {content}
    </>
  ) : (
    <Layout
      strict={false}
      title="Az oldal nem található"
      url={window.location.pathname}
      noIndex
      noFollow
    >
      {content}
    </Layout>
  )
}

export default NoMatch
