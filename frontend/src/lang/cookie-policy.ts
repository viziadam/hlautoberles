import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'
import env from '@/config/env.config'
import { SITE } from '@/config/site.config'

const consentStorageKey = 'hlautoberles-consent-v1'

const strings = new LocalizedStrings({
  hu: {
    TITLE: 'Sütikezelési tájékoztató',
    POLICY: `
      Hatályos: 2026. július 19.

      A ${env.WEBSITE_NAME} weboldal feltétlenül szükséges böngészőoldali tárolást, valamint az Ön hozzájárulása esetén statisztikai sütiket használ.

      1. Feltétlenül szükséges tárolás

      Név: ${consentStorageKey}
      Szolgáltató: ${env.WEBSITE_NAME}
      Típus: localStorage
      Cél: a statisztikai sütik elfogadásának vagy elutasításának megjegyzése
      Jogalap: a weboldal működéséhez szükséges technikai tárolás
      Megőrzés: a választás módosításáig vagy a böngésző webhelyadatainak törléséig

      Ehhez a tároláshoz nem kérünk külön hozzájárulást, mert a felhasználó sütiválasztásának megőrzéséhez szükséges.

      2. Google Analytics 4

      A Google Analytics a weboldal látogatottságának és használatának statisztikai elemzésére szolgál.

      Szolgáltató: Google
      Kategória: statisztikai
      Jogalap: hozzájárulás

      Használt sütik:

      - _ga: a látogatók megkülönböztetése; alapértelmezett megőrzése legfeljebb 2 év
      - _ga_<azonosító>: a munkamenet állapotának megőrzése; alapértelmezett megőrzése legfeljebb 2 év

      A Google Analytics csak a statisztikai sütik elfogadása után használható.

      3. Microsoft Clarity

      A Microsoft Clarity a weboldal használhatóságának vizsgálatára, hőtérképek és munkamenet-elemzések készítésére szolgál.

      Szolgáltató: Microsoft
      Kategória: statisztikai
      Jogalap: hozzájárulás

      Használt sütik lehetnek:

      - _clck: a Clarity látogatói azonosítójának és beállításainak megőrzése
      - _clsk: az egy munkamenethez tartozó oldalmegtekintések összekapcsolása

      A Clarity csak a statisztikai sütik elfogadása után használható. A sütik tényleges lejárata a Microsoft aktuális beállításaitól és a böngésző beállításaitól függ.

      4. A hozzájárulás kezelése

      Első látogatáskor elfogadhatja vagy elutasíthatja a statisztikai sütiket. Az elutasítás nem korlátozza a weboldal alapvető funkcióit.

      A hozzájárulás bármikor módosítható vagy visszavonható a láblécben található Sütibeállítások hivatkozással. A böngészőben tárolt adatok a böngésző beállításaiban is törölhetők.

      A weboldal nem használ személyre szabott hirdetési sütiket.

      5. Adattovábbítás és további információ

      A Google és a Microsoft az Európai Gazdasági Térségen kívül is kezelhet adatokat. Ilyen esetben a GDPR által megengedett adattovábbítási garanciákat alkalmazzák.

      A személyes adatok kezeléséről további információ az Adatvédelmi tájékoztatóban található.

      Kapcsolat:

      E-mail: ${SITE.email}
      Telefon: ${SITE.phone}
      `,
  },
  en: {
    TITLE: 'Cookie Policy',
    POLICY: `
      Effective date: 19 July 2026
        
      The ${env.WEBSITE_NAME} website uses strictly necessary browser storage and, with your consent, analytics cookies.
        
      1. Strictly necessary storage
        
      Name: ${consentStorageKey}
      Provider: ${env.WEBSITE_NAME}
      Type: localStorage
      Purpose: remembering whether analytics cookies were accepted or rejected
      Legal basis: technical storage necessary for the operation of the website
      Retention: until you change your choice or delete the website data in your browser
        
      Separate consent is not requested because this storage is necessary to remember your cookie preference.
        
      2. Google Analytics 4
        
      Google Analytics is used to produce statistics about website visits and usage.
        
      Provider: Google
      Category: analytics
      Legal basis: consent
        
      Cookies:
        
      - _ga: distinguishes visitors; default retention up to 2 years
      - _ga_<identifier>: maintains session state; default retention up to 2 years
        
      Google Analytics is used only after analytics cookies are accepted.
        
      3. Microsoft Clarity
        
      Microsoft Clarity is used to analyse website usability and create heatmaps and session analytics.
        
      Provider: Microsoft
      Category: analytics
      Legal basis: consent
        
      Cookies may include:
        
      - _clck: retains the Clarity visitor identifier and preferences
      - _clsk: connects page views into a single session
        
      Clarity is used only after analytics cookies are accepted. Actual cookie expiry may depend on Microsoft's current settings and browser settings.
        
      4. Managing consent
        
      On your first visit, you may accept or reject analytics cookies. Rejecting analytics does not restrict the essential functions of the website.
        
      Consent may be changed or withdrawn at any time through the Cookie settings link in the footer. Stored website data may also be deleted through your browser settings.
        
      The website does not use personalised advertising cookies.
        
      5. Transfers and further information
        
      Google and Microsoft may process data outside the European Economic Area. Where this occurs, safeguards permitted by the GDPR are used.
        
      Further information about personal data processing is available in the Privacy Policy.
        
      Contact:
        
      Email: ${SITE.email}
      Phone: ${SITE.phone}
      `,
  },
  fr: {
    TITLE: 'Politique relative aux cookies',
    POLICY: `
Date d’effet : 19 juillet 2026

Cette politique explique les cookies, le stockage dans le navigateur et les technologies similaires utilisés par le site ${env.WEBSITE_NAME}. Les services de mesure ne démarrent qu’après votre consentement explicite. La simple utilisation du site ne vaut pas consentement.

1. Technologies strictement nécessaires

Le site peut utiliser les données techniques nécessaires au fonctionnement, à la connexion sécurisée, à la gestion des sessions et à la mémorisation de vos paramètres.

Votre choix est conservé sous la clé localStorage ${consentStorageKey}. Elle contient la version du mécanisme, le caractère nécessaire du stockage, votre choix analytique et la date de mise à jour. Elle reste stockée jusqu’à la modification du choix ou la suppression des données du site dans le navigateur.

2. Google Analytics 4

Avec votre consentement, Google Analytics 4 mesure de manière agrégée les visites, pages vues, recherches et étapes du parcours de réservation. Avant le consentement, le service n’est pas chargé. analytics_storage est autorisé uniquement après acceptation ; ad_storage, ad_user_data et ad_personalization restent refusés.

Les cookies _ga et _ga_<identifiant> peuvent être utilisés, avec une durée par défaut pouvant atteindre 2 ans, sous réserve des limites du navigateur. La conservation configurée des données utilisateur et événementielles est de 14 mois.

3. Microsoft Clarity

Avec votre consentement, Clarity peut produire des cartes thermiques, des statistiques d’interaction et des enregistrements de session masqués. Le mode de masquage équilibré est activé et les formulaires ainsi que les pages privées sont masqués par l’application.

Les cookies _clck et _clsk peuvent être utilisés après consentement. Les données de lecture des enregistrements sont actuellement conservées 30 jours ; d’autres données agrégées peuvent être conservées plus longtemps selon les règles de Microsoft.

4. Absence de publicité ciblée

Le stockage publicitaire et la personnalisation publicitaire restent désactivés. Les outils statistiques ne sont activés qu’après consentement.

5. Gestion du consentement

Vous pouvez modifier ou retirer votre consentement à tout moment via le lien « Paramètres des cookies » dans le pied de page. Le retrait arrête les futures mesures et le site tente de supprimer les cookies analytiques accessibles. Vous pouvez également supprimer toutes les données du site dans votre navigateur.

6. Contact

- E-mail : ${SITE.email}
- Téléphone : ${SITE.phone}
- Site : ${SITE.url}
    `,
  },
  es: {
    TITLE: 'Política de cookies',
    POLICY: `
Fecha de entrada en vigor: 19 de julio de 2026

Esta política explica las cookies, el almacenamiento del navegador y las tecnologías similares utilizadas por el sitio ${env.WEBSITE_NAME}. Los servicios analíticos solo se activan después de su consentimiento explícito. El uso del sitio por sí solo no constituye consentimiento.

1. Tecnologías estrictamente necesarias

El sitio puede utilizar datos técnicos necesarios para su funcionamiento, el inicio de sesión seguro, la gestión de sesiones y la conservación de preferencias.

Su elección se guarda en localStorage con la clave ${consentStorageKey}. Contiene la versión del mecanismo, el indicador de almacenamiento necesario, la preferencia analítica y la fecha de actualización. Se conserva hasta que cambie la elección o elimine los datos del sitio en el navegador.

2. Google Analytics 4

Con su consentimiento, Google Analytics 4 mide de forma agregada visitas, páginas vistas, búsquedas y pasos del proceso de reserva. Antes del consentimiento no se carga. Solo analytics_storage se autoriza después de aceptar; ad_storage, ad_user_data y ad_personalization permanecen denegados.

Pueden utilizarse las cookies _ga y _ga_<identificador>, con una duración predeterminada de hasta 2 años, sujeta a las limitaciones del navegador. La conservación configurada de datos de usuario y eventos es de 14 meses.

3. Microsoft Clarity

Con su consentimiento, Clarity puede crear mapas de calor, estadísticas de interacción y grabaciones de sesión enmascaradas. Se utiliza el modo de enmascaramiento equilibrado y la aplicación enmascara además los formularios y las páginas privadas.

Después del consentimiento pueden utilizarse _clck y _clsk. Los datos de reproducción se conservan actualmente durante 30 días; otros datos agregados pueden conservarse durante más tiempo conforme a las reglas de Microsoft.

4. Sin publicidad dirigida

El almacenamiento publicitario y la personalización de anuncios permanecen desactivados. Las herramientas analíticas solo se activan tras el consentimiento.

5. Gestión del consentimiento

Puede cambiar o retirar su consentimiento en cualquier momento mediante el enlace «Configuración de cookies» del pie de página. La retirada detiene las mediciones futuras y el sitio intenta borrar las cookies analíticas accesibles. También puede eliminar todos los datos del sitio desde el navegador.

6. Contacto

- Correo electrónico: ${SITE.email}
- Teléfono: ${SITE.phone}
- Sitio web: ${SITE.url}
    `,
  },
})

langHelper.setLanguage(strings)

export { strings }
