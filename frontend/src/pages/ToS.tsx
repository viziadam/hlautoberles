import React from 'react'
import { strings } from '@/lang/tos'
import Layout from '@/components/Layout'
import Footer from '@/components/Footer'

import '@/assets/css/tos.css'

const ToS = () => {
  const onLoad = () => { }

  return (
    <Layout onLoad={onLoad} strict={false} title="Általános szerződési feltételek" url="/tos">
      <div className="tos">
        <h1>{strings.TITLE}</h1>
        <p>{strings.TOS}</p>
      </div>
      <Footer />
    </Layout>
  )
}

export default ToS
