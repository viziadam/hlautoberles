import React from 'react'
import ServiceLanding from '@/components/ServiceLanding'

const DriverService = () => (
  <ServiceLanding
    path="/soforszolgalat"
    title="Járműbérlés sofőrrel Budapesten"
    metaDescription="Sofőrrel igényelhető bérelt jármű Budapesten, előzetes egyeztetéssel. Kérj tájékoztatást a lehetőségekről és az elérhető időpontokról."
    serviceType="Sofőrrel igényelhető járműbérlés"
    intro="Ha a szállításhoz járműre és sofőrre is szükséged van, jelezd ezt az igényedet. A lehetőségekről, az időpontról és a részletekről minden esetben előre egyeztetünk."
    sections={[
      {
        title: 'Mikor lehet hasznos?',
        items: ['ha nincs megfelelő jogosítványod a kiválasztott járműhöz', 'ha a rakodásra vagy a munka más részére szeretnél összpontosítani', 'ha egyszeri szállítási feladathoz keresel megoldást'],
      },
      {
        title: 'Hogyan kérhető?',
        paragraphs: ['Vedd fel velünk a kapcsolatot a tervezett időponttal, útvonallal és a szállítás rövid leírásával. Ezek alapján tudunk pontos tájékoztatást adni.'],
      },
    ]}
  />
)

export default DriverService
