import React from 'react'
import ServiceLanding from '@/components/ServiceLanding'

const CarRentalBudapest = () => (
  <ServiceLanding
    path="/autoberles-budapest"
    title="Autóbérlés Budapest XI. kerületében"
    metaDescription="Személyautó-bérlés Budapest XI. kerületében, átlátható feltételekkel és egyszerű online foglalással. Átvétel a Galvani utcában."
    serviceType="Személyautó-bérlés"
    intro="Személyautóra van szükséged néhány órára, egy napra vagy hosszabb időre? A foglalási felületen megadhatod az időpontokat, és megnézheted az elérhető járműveket."
    sections={[
      {
        title: 'Egyszerű, átlátható bérlés',
        paragraphs: ['A választható időszakot és a foglalás részleteit még az igénylés elküldése előtt áttekintheted. Kérdés esetén közvetlenül velünk egyeztethetsz.'],
      },
      {
        title: 'Rövid vagy hosszabb időre',
        paragraphs: ['A járművek rövid és hosszabb bérlési időszakra is kereshetők. Az aktuális elérhetőséget mindig a kiválasztott átvételi és leadási időpont alapján látod.'],
      },
    ]}
  />
)

export default CarRentalBudapest
