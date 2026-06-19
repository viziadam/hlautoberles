import React from 'react'
import ServiceLanding from '@/components/ServiceLanding'

const TruckRentalBudapest = () => (
  <ServiceLanding
    path="/teherauto-berles-budapest"
    title="Teherautó-bérlés Budapesten"
    metaDescription="Kisteherautó- és teherautó-bérlés Budapesten költözéshez, szállításhoz vagy munkavégzéshez. Online keresés, átvétel a XI. kerületben."
    serviceType="Kisteherautó- és teherautó-bérlés"
    intro="Költözéshez, áruszállításhoz vagy munkavégzéshez keresel megfelelő járművet? Add meg a tervezett időpontot, és nézd meg az elérhető kisteherautókat és teherautókat."
    sections={[
      {
        title: 'A feladathoz illő jármű',
        paragraphs: ['A kínálatban kis dobozos és nagyobb teherautók is szerepelhetnek. Foglalás előtt ellenőrizd a kiválasztott jármű adatlapját, hogy méretben és terhelhetőségben megfeleljen a feladatnak.'],
      },
      {
        title: 'Tervezhető ügyintézés',
        items: ['online időpont- és járműkeresés', 'előre áttekinthető foglalási adatok', 'közvetlen egyeztetés az átvételről', 'igény esetén sofőrszolgálat'],
      },
    ]}
  />
)

export default TruckRentalBudapest
