import React from 'react'
import FaqList from '@/components/FaqList'
import Footer from '@/components/Footer'
import Layout from '@/components/Layout'

import '@/assets/css/faq.css'

const Faq = () => (
  <Layout
    strict={false}
    title="Gyakori kérdések"
    description="Válaszok a HLAutóbérlés jármű- és eszközbérlésével, foglalásával és átvételével kapcsolatos gyakori kérdésekre."
    url="/faq"
  >
    <div className="faq">
      <FaqList />
    </div>

    <Footer />
  </Layout>
)

export default Faq
