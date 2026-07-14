import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { SITE } from '@/config/site.config'

const VehicleSeoContent = () => (
  <div className="vehicle-seo-content">
    <section aria-labelledby="passenger-car-rental-title">
      <h2 id="passenger-car-rental-title">
        Személyautó-bérlés Budapest XI. kerületében
      </h2>

      <p>
        Személyautóink rövid vagy hosszabb időszakra is bérelhetők.
        Az online keresőben az átvételi és leadási időpont megadása után
        az adott időszakban elérhető járművek jelennek meg.
      </p>

      <p>
        A jármű adatlapján megtekintheted az árat, a férőhelyek számát,
        a sebességváltó típusát, az üzemanyag-feltételeket, a kauciót és
        a bérléshez kapcsolódó további információkat.
      </p>
    </section>

    <section
      id="teherauto-berles"
      aria-labelledby="truck-rental-title"
    >
      <h2 id="truck-rental-title">
        Kisteherautó- és teherautó-bérlés Budapesten
      </h2>

      <p>
        Költözéshez, áruszállításhoz vagy munkavégzéshez kis dobozos,
        nagyobb rakterű és teherautó kategóriájú járművek közül
        választhatsz.
      </p>

      <p>
        A megfelelő jármű kiválasztásakor ellenőrizd a méretet,
        a terhelhetőséget, a napi kilométerkeretet és a jármű adatlapján
        szereplő egyéb feltételeket.
      </p>
    </section>

    <section aria-labelledby="driver-rental-title">
      <h2 id="driver-rental-title">
        Járműbérlés sofőrrel
      </h2>

      <p>
        Igény esetén egyes járművek sofőrrel is kérhetők. Az útvonalat,
        az időpontot, a rakományt és a szolgáltatás díját minden esetben
        előzetesen egyeztetjük.
      </p>

      <RouterLink to="/contact">
        Érdeklődés sofőrrel igényelhető járműről
      </RouterLink>
    </section>

    <section aria-labelledby="pickup-title">
      <h2 id="pickup-title">
        Átvétel és kapcsolat
      </h2>

      <p>
        A járművek átvételi helye: {SITE.address.postalCode}{' '}
        {SITE.address.addressLocality}, {SITE.address.streetAddress}
      </p>

      <p>
        Szerszámra vagy munkavégzéshez használható eszközre is
        szükséged van?
      </p>

      <RouterLink to="/szerszamkolcsonzes-budapest">
        Bérelhető szerszámok megtekintése
      </RouterLink>
    </section>
  </div>
)

export default VehicleSeoContent
