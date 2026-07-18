import React, {
  ReactNode,
  useEffect,
  useMemo,
} from 'react'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet'
import L, { LatLngExpression } from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import * as bookcarsTypes from ':bookcars-types'
import { strings } from '@/lang/map'
import * as LocationService from '@/services/LocationService'
import * as helper from '@/utils/helper'

import 'leaflet-boundary-canvas'
import 'leaflet/dist/leaflet.css'
import '@/assets/css/map.css'

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowAnchor: [12, 41],
})

L.Marker.prototype.options.icon = DefaultIcon

interface MarkerItem {
  id: string
  name: string
  position: L.LatLngExpression
}

interface MapViewportControllerProps {
  position: LatLngExpression
  zoom: number
  markers: MarkerItem[]
}

const MapViewportController = ({
  position,
  zoom,
  markers,
}: MapViewportControllerProps) => {
  const map = useMap()

  useEffect(() => {
    map.attributionControl.setPrefix('')

    const invalidateTimer = window.setTimeout(() => {
      map.invalidateSize(false)

      if (markers.length > 1) {
        const bounds = L.latLngBounds(
          markers.map((marker) => marker.position),
        )

        map.fitBounds(bounds, {
          padding: [30, 30],
          animate: false,
        })
      } else {
        map.setView(position, zoom, {
          animate: false,
        })
      }
    }, 0)

    return () => {
      window.clearTimeout(invalidateTimer)
    }
  }, [
    map,
    markers,
    position,
    zoom,
  ])

  return null
}

interface MapProps {
  title?: string
  position: LatLngExpression
  initialZoom?: number
  locations?: bookcarsTypes.Location[]
  parkingSpots?: bookcarsTypes.ParkingSpot[]
  className?: string
  children?: ReactNode
  onSelelectPickUpLocation?: (locationId: string) => void
}

const Map = ({
  title,
  position,
  initialZoom = 14,
  locations = [],
  parkingSpots = [],
  className,
  children,
  onSelelectPickUpLocation,
}: MapProps) => {
  const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

  const locationMarkers = useMemo<MarkerItem[]>(
    () => locations
      .filter((location) => {
        const latitude = Number(location.latitude)
        const longitude = Number(location.longitude)

        return (
          Number.isFinite(latitude)
          && Number.isFinite(longitude)
        )
      })
      .map((location) => ({
        id: String(location._id || location.name),
        name: location.name || '',
        position: [
          Number(location.latitude),
          Number(location.longitude),
        ],
      })),
    [locations],
  )

  const parkingMarkers = useMemo<MarkerItem[]>(
    () => parkingSpots
      .filter((parkingSpot) => {
        const latitude = Number(parkingSpot.latitude)
        const longitude = Number(parkingSpot.longitude)

        return (
          Number.isFinite(latitude)
          && Number.isFinite(longitude)
        )
      })
      .map((parkingSpot) => ({
        id: String(parkingSpot._id),
        name: parkingSpot.name || '',
        position: [
          Number(parkingSpot.latitude),
          Number(parkingSpot.longitude),
        ],
      })),
    [parkingSpots],
  )

  const markersToFit = useMemo(
    () => [...locationMarkers, ...parkingMarkers],
    [locationMarkers, parkingMarkers],
  )

  return (
    <>
      {title && (
        <h2 className="map-title">
          {title}
        </h2>
      )}

      <MapContainer
        center={position}
        zoom={initialZoom}
        className={`${className ? `${className} ` : ''}map`}
      >
        <TileLayer url={tileURL} />

        <MapViewportController
          position={position}
          zoom={initialZoom}
          markers={markersToFit}
        />

        {locationMarkers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
          >
            <Popup className="marker">
              <div className="name">
                {marker.name}
              </div>

              {!!onSelelectPickUpLocation && (
                <div className="action">
                  <button
                    type="button"
                    className="action-btn"
                    onClick={async () => {
                      try {
                        const { status, data } =
                          await LocationService.getLocationId(
                            marker.name,
                            'en',
                          )

                        if (status === 200) {
                          onSelelectPickUpLocation(data)
                        } else {
                          helper.error()
                        }
                      } catch (err) {
                        helper.error(err)
                      }
                    }}
                  >
                    {strings.SELECT_PICK_UP_LOCATION}
                  </button>
                </div>
              )}
            </Popup>
          </Marker>
        ))}

        {parkingMarkers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
          >
            <Popup className="marker">
              <div className="name">
                {marker.name}
              </div>
            </Popup>
          </Marker>
        ))}

        {children}
      </MapContainer>
    </>
  )
}

export default Map
