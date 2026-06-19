import React from 'react'
import ServiceLanding from '@/components/ServiceLanding'

const ToolRentalBudapest = () => (
  <ServiceLanding
    path="/szerszamkolcsonzes-budapest"
    title="Szerszámkölcsönzés Budapesten"
    metaDescription="Professzionális szerszámok és munkavégzést segítő eszközök kölcsönzése Budapest XI. kerületében, egyszerű online igényléssel."
    serviceType="Szerszámkölcsönzés"
    intro="Nem érdemes minden munkához külön gépet vagy eszközt vásárolni. Nálunk a szükséges időszakra kereshetsz bérelhető szerszámot, létrát, fellépőt vagy állványt."
    sections={[
      {
        title: 'Milyen eszközök érhetők el?',
        items: ['kézi behajtók', 'sarokcsiszolók', 'fa- és alumínium létrák', 'fellépők és állványok'],
      },
      {
        title: 'Foglalás a munka üteméhez',
        paragraphs: ['Válaszd ki az időszakot, majd nézd meg az aktuálisan elérhető eszközöket. Ha nem vagy biztos benne, melyik felel meg a feladathoz, lépj velünk kapcsolatba.'],
      },
    ]}
  />
)

export default ToolRentalBudapest
