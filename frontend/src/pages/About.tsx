import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Layout from '@/components/Layout'
import Footer from '@/components/Footer'

import '@/assets/css/about.css'

const About = () => {
  const onLoad = () => { }

  return (
    <Layout
      onLoad={onLoad}
      strict={false}
      title="Rólunk"
      description="Ismerd meg a HLAutóbérlés budapesti jármű- és szerszámbérlési szolgáltatásait, valamint az egyszerű online foglalás menetét."
      url="/about"
    >
      <main className="about">
        <h1>A HLAutóbérlés bemutatása</h1>
        <p>
          Személyautók, kisteherautók, nagyobb teherautók és munkavégzéshez
          használható szerszámok bérlésével foglalkozunk. Az átvétel
          Budapest XI. kerületében, a Galvani utcában történik.
        </p>

        <h2>Egy helyen a jármű és a szükséges eszköz</h2>
        <p>
          Célunk, hogy a bérlés menete könnyen követhető legyen: az online
          keresőben megadhatod az időszakot, áttekintheted a lehetőségeket,
          majd elküldheted a foglalási igényt. Ha a feladathoz sofőrre is
          szükséged van, erről külön tudunk egyeztetni.
        </p>

        <h2>Miért érdemes közvetlenül velünk egyeztetni?</h2>
        <p>
          Kérdés esetén nem egy közvetítővel, hanem az üzemeltetővel beszélsz.
          Így még foglalás előtt tisztázhatod, melyik jármű vagy eszköz felel
          meg a tervezett munkához és időszakhoz.
        </p>

        <RouterLink className="btn-primary about-cta" to="/">
          Elérhető járművek és eszközök
        </RouterLink>
      </main>

      <Footer />
    </Layout>
  )
}

export default About
