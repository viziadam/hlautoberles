import React from 'react'
import { Button } from '@mui/material'
import {
  ArrowForward,
  DirectionsCar,
  Handyman,
  LocalShipping,
  LocationOn,
  PersonPinCircle,
} from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import { SITE } from '@/config/site.config'

import * as bookcarsTypes from ':bookcars-types'
import { createVehicleSearchUrl } from '@/utils/vehicleSearch'
import { strings } from '@/lang/search'

const VehicleSeoContent = () => (
  <section
    className="vehicle-services"
    aria-labelledby="vehicle-services-title"
  >
    <header className="vehicle-services-heading">
      <span className="vehicle-services-eyebrow">
        {strings.SERVICES_EYEBROW}
      </span>

      <h2 id="vehicle-services-title">
        {strings.SERVICES_TITLE}
      </h2>

      <p> {strings.SERVICES_DESCRIPTION} </p>
    </header>

    <div className="vehicle-service-grid">
      <article className="vehicle-service-card">
        <div className="vehicle-service-card-icon" aria-hidden="true">
          <DirectionsCar />
        </div>

        <h3>{strings.PASSENGER_TITLE}</h3>

        <p>
          {strings.PASSENGER_TEXT}
        </p>

        <RouterLink
          to={createVehicleSearchUrl([
            bookcarsTypes.CarRange.Mini,
          ])}
          className="vehicle-service-link"
        >
          {strings.PASSENGER_LINK}
          <ArrowForward aria-hidden="true" />
        </RouterLink>
      </article>

      <article
        className="vehicle-service-card"
        id="teherauto-berles"
      >
        <div className="vehicle-service-card-icon" aria-hidden="true">
          <LocalShipping />
        </div>

        <h3>{strings.TRUCK_TITLE}</h3>

        <p>
          {strings.TRUCK_TEXT}
        </p>

        <RouterLink
        to={createVehicleSearchUrl([
            bookcarsTypes.CarRange.Midi,
            bookcarsTypes.CarRange.Maxi,
        ])}
        className="vehicle-service-link"
        >
        {strings.TRUCK_LINK}
        <ArrowForward aria-hidden="true" />
        </RouterLink>
      </article>

      <article className="vehicle-service-card">
        <div className="vehicle-service-card-icon" aria-hidden="true">
          <PersonPinCircle />
        </div>

        <h3>{strings.DRIVER_TITLE}</h3>

        <p>
          {strings.DRIVER_TEXT}
        </p>

        <Button
          component={RouterLink}
          to="/contact"
          variant="contained"
          disableElevation
          className="btn-primary vehicle-service-button"
          endIcon={<ArrowForward />}
        >
          {strings.DRIVER_LINK}
        </Button>
      </article>
    </div>

    <div className="vehicle-extra-service">
      <div className="vehicle-extra-service-icon" aria-hidden="true">
        <Handyman />
      </div>

      <div className="vehicle-extra-service-content">
        <span>{strings.TOOLS_EYEBROW}</span>

        <h3>{strings.TOOLS_TITLE}</h3>

        <p>
          {strings.TOOLS_TEXT}
        </p>
      </div>

      <Button
        component={RouterLink}
        to="/szerszamkolcsonzes-budapest"
        variant="contained"
        disableElevation
        className="btn-primary vehicle-extra-service-button"
        endIcon={<ArrowForward />}
      >
        {strings.TOOLS_LINK}
      </Button>
    </div>

    <div className="vehicle-pickup-information">
      <LocationOn aria-hidden="true" />

      <p>
        <strong>{strings.PICKUP_LABEL}</strong>{' '}
        {SITE.address.postalCode} {SITE.address.addressLocality},{' '}
        {SITE.address.streetAddress}
      </p>

      <RouterLink to="/contact">
        {strings.CONTACT_LINK}
      </RouterLink>
    </div>
  </section>
)

export default VehicleSeoContent
