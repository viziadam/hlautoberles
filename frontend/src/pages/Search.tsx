import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { Tune as FiltersIcon } from '@mui/icons-material'
import * as bookcarsTypes from ':bookcars-types'
import * as bookcarsHelper from ':bookcars-helper'
import { strings } from '@/lang/search'

import Layout from '@/components/Layout'
import NoMatch from './NoMatch'
import CarFilter from '@/components/CarFilter'
import CarSpecsFilter from '@/components/CarSpecsFilter'
import SupplierFilter from '@/components/SupplierFilter'
import CarType from '@/components/CarTypeFilter'
import GearboxFilter from '@/components/GearboxFilter'
import MileageFilter from '@/components/MileageFilter'
import FuelPolicyFilter from '@/components/FuelPolicyFilter'
import DepositFilter from '@/components/DepositFilter'
import CarList from '@/components/CarList'
import CarRatingFilter from '@/components/CarRatingFilter'
import CarRangeFilter from '@/components/CarRangeFilter'
import CarMultimediaFilter from '@/components/CarMultimediaFilter'
import CarSeatsFilter from '@/components/CarSeatsFilter'
import Map from '@/components/Map'
import SearchForm from '@/components/SearchForm'
import Footer from '@/components/Footer'
import VehicleSeoContent from '@/components/VehicleSeoContent'
import { localBusinessSchema, serviceSchema } from '@/utils/seoSchemas'




import '@/assets/css/search.css'

const parseDate = (value: unknown): Date | undefined => {
  if (!value) {
    return undefined
  }

  const date = value instanceof Date
    ? value
    : new Date(String(value))

  return Number.isNaN(date.getTime()) ? undefined : date
}

const parseRanges = (
  value: string | null,
): bookcarsTypes.CarRange[] => {
  if (!value) {
    return []
  }

  const allowedRanges = Object.values(bookcarsTypes.CarRange)

  return value
    .split(',')
    .filter((range): range is bookcarsTypes.CarRange => (
      allowedRanges.includes(range as bookcarsTypes.CarRange)
    ))
}

const COMPANY_POSITION: [number, number] = [
  47.4639, // kb. 1117 Budapest, Galvani u. 1–3 szélesség
  19.0583, // kb. hosszúság
]

const Search = () => {
  const location = useLocation()

  const navigate = useNavigate()

  const [visible, setVisible] = useState(false)
  // const [noMatch, setNoMatch] = useState(false)
  // const [pickupLocation, setPickupLocation] = useState<bookcarsTypes.Location>()
  // const [dropOffLocation, setDropOffLocation] = useState<bookcarsTypes.Location>()
  const [from, setFrom] = useState<Date>()
  const [to, setTo] = useState<Date>()
  // const [allSuppliers, setAllSuppliers] = useState<bookcarsTypes.User[]>([])
  // const [allSuppliersIds, setAllSuppliersIds] = useState<string[]>([])
  // const [suppliers, setSuppliers] = useState<bookcarsTypes.User[]>([])
  // const [supplierIds, setSupplierIds] = useState<string[]>()
  const [loading, setLoading] = useState(true)
  const [carSpecs, setCarSpecs] = useState<bookcarsTypes.CarSpecs>({})
  const [carType, setCarType] = useState(bookcarsHelper.getAllCarTypes())
  const [gearbox, setGearbox] = useState([bookcarsTypes.GearboxType.Automatic, bookcarsTypes.GearboxType.Manual])
  const [mileage, setMileage] = useState([bookcarsTypes.Mileage.Limited, bookcarsTypes.Mileage.Unlimited])
  const [fuelPolicy, setFuelPolicy] = useState(bookcarsHelper.getAllFuelPolicies())
  const [deposit, setDeposit] = useState(-1)
  const [ranges, setRanges] = useState(bookcarsHelper.getAllRanges())
  const [multimedia, setMultimedia] = useState<bookcarsTypes.CarMultimedia[]>([])
  const [rating, setRating] = useState(-1)
  const [seats, setSeats] = useState(-1)
  const [openMapDialog, setOpenMapDialog] = useState(false)
  // const [distance, setDistance] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  // const [loadingPage, setLoadingPage] = useState(true)

  useEffect(() => {
  const params = new URLSearchParams(location.search)

  const parsedFrom = parseDate(params.get('from'))
  const parsedTo = parseDate(params.get('to'))
  const parsedRanges = parseRanges(params.get('ranges'))

  const validDateRange = (
    parsedFrom
    && parsedTo
    && parsedTo.getTime() > parsedFrom.getTime()
  )

  if (!validDateRange) {
    setFrom(undefined)
    setTo(undefined)
    setRanges(bookcarsHelper.getAllRanges())
    return
  }

  setFrom(parsedFrom)
  setTo(parsedTo)

  setRanges(
    parsedRanges.length > 0
      ? parsedRanges
      : bookcarsHelper.getAllRanges(),
  )
}, [location.search])

  // const handleCarFilterSubmit = async (filter: bookcarsTypes.CarFilter) => {
  //   // if (suppliers.length < allSuppliers.length) {
  //   //   const _supplierIds = bookcarsHelper.clone(allSuppliersIds)
  //   //   setSupplierIds(_supplierIds)
  //   // }

  //   // setPickupLocation(filter.pickupLocation)
  //   // setDropOffLocation(filter.dropOffLocation)
  //   setFrom(filter.from)
  //   setTo(filter.to)
  // }

  const handleCarFilterSubmit = async (filter: bookcarsTypes.CarFilter) => {
  if (!filter.from || !filter.to) {
    return
  }

  const params = new URLSearchParams({
    from: filter.from.toISOString(),
    to: filter.to.toISOString(),
    ranges: ranges.join(','),
  })

  navigate(
    {
      pathname: '/autoberles-budapest',
      search: `?${params.toString()}`,
    },
    {
      replace: true,
    },
  )
}

  // const handleSupplierFilterChange = (newSuppliers: string[]) => {
  //   setSupplierIds(newSuppliers)
  // }

  const handleRatingFilterChange = (value: number) => {
    setRating(value)
  }

  const handleRangeFilterChange = (value: bookcarsTypes.CarRange[]) => {
    setRanges(value)
  }

  const handleMultimediaFilterChange = (value: bookcarsTypes.CarMultimedia[]) => {
    setMultimedia(value)
  }

  const handleSeatsFilterChange = (value: number) => {
    setSeats(value)
  }

  const handleCarSpecsFilterChange = (value: bookcarsTypes.CarSpecs) => {
    setCarSpecs(value)
  }

  const handleCarTypeFilterChange = (values: bookcarsTypes.CarType[]) => {
    setCarType(values)
  }

  const handleGearboxFilterChange = (values: bookcarsTypes.GearboxType[]) => {
    setGearbox(values)
  }

  const handleMileageFilterChange = (values: bookcarsTypes.Mileage[]) => {
    setMileage(values)
  }

  const handleFuelPolicyFilterChange = (values: bookcarsTypes.FuelPolicy[]) => {
    setFuelPolicy(values)
  }

  const handleDepositFilterChange = (value: number) => {
    setDeposit(value)
  }

  // const onLoad = async (user?: bookcarsTypes.User) => {
  //   const { state } = location
  //   if (!state) {
  //     setNoMatch(true)
  //     return
  //   }

  //   const { from: _from, to: _to, ranges: _ranges } = state as {
  //     from?: Date
  //     to?: Date
  //     ranges?: bookcarsTypes.CarRange[]
  //   }

  //   if (!_from || !_to) {
  //     setLoading(false)
  //     setNoMatch(true)
  //     return
  //   }

  //   setFrom(_from)
  //   setTo(_to)

  //   if (_ranges) {
  //     setRanges(_ranges)
  //   }

  //   setLoading(false)
  //   if (!user || (user && user.verified)) {
  //     setVisible(true)
  //   }
  // }

  const onLoad = async (user?: bookcarsTypes.User) => {
  const params = new URLSearchParams(location.search)

  const state = location.state as {
    from?: Date | string
    to?: Date | string
    ranges?: bookcarsTypes.CarRange[]
  } | null

  // Az új, URL-alapú adatok.
  const queryFrom = parseDate(params.get('from'))
  const queryTo = parseDate(params.get('to'))
  const queryRanges = parseRanges(params.get('ranges'))

  // A régi location.state továbbra is támogatott.
  const stateFrom = parseDate(state?.from)
  const stateTo = parseDate(state?.to)

  const resolvedFrom = queryFrom || stateFrom
  const resolvedTo = queryTo || stateTo

  const resolvedRanges = queryRanges.length > 0
    ? queryRanges
    : state?.ranges

  const validDateRange = (
    resolvedFrom
    && resolvedTo
    && resolvedTo.getTime() > resolvedFrom.getTime()
  )

  if (validDateRange) {
    setFrom(resolvedFrom)
    setTo(resolvedTo)

    if (resolvedRanges && resolvedRanges.length > 0) {
      setRanges(resolvedRanges)
    }
  } else {
    // Ez már nem 404-es helyzet.
    // Egyszerűen nincs még kiválasztott időpont.
    setFrom(undefined)
    setTo(undefined)
  }

  setLoading(false)

  if (!user || user.verified) {
    setVisible(true)
  }
}

return (
  <Layout
    onLoad={onLoad}
    strict={false}
    title="Autó- és teherautó-bérlés Budapesten"
    description="Személyautó-, kisteherautó- és teherautó-bérlés Budapest XI. kerületében. Válassz időpontot, nézd meg az elérhető járműveket és foglalj online."
    url="/autoberles-budapest"
    jsonLd={[
      localBusinessSchema,
      serviceSchema(
        'Autó- és teherautó-bérlés Budapesten',
        'Személyautó-, kisteherautó- és teherautó-bérlés',
        '/autoberles-budapest',
      ),
    ]}
  >
    <main className="vehicle-search-page">
      <header className="vehicle-search-header">
        <h1>Autó- és teherautó-bérlés Budapesten</h1>

        <p>
          Válassz átvételi és leadási időpontot, majd nézd meg az
          elérhető személyautókat, kisteherautókat és teherautókat.
        </p>
      </header>

      {visible && !from && !to && (
        <section
          className="vehicle-search-start"
          aria-labelledby="vehicle-search-form-title"
        >
          <h2 id="vehicle-search-form-title">
            Elérhető járművek keresése
          </h2>

          <SearchForm />
        </section>
      )}

      {visible && from && to && (
        <div className="search">
          <aside className="col-1">
            {!loading && (
              <>
                <Map
                  position={COMPANY_POSITION}
                  initialZoom={14}
                  locations={[]}
                  parkingSpots={undefined}
                  className="map"
                />

                <CarFilter
                  className="filter"
                  from={from}
                  to={to}
                  collapse
                  onSubmit={handleCarFilterSubmit}
                />

                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<FiltersIcon />}
                  disableElevation
                  fullWidth
                  className="btn btn-filters"
                  onClick={() => setShowFilters((prev) => !prev)}
                >
                  {showFilters ? strings.HILE_FILTERS : strings.SHOW_FILTERS}
                </Button>

                {showFilters && (
                  <>
                    <CarRatingFilter
                      className="filter"
                      onChange={handleRatingFilterChange}
                    />

                    <CarRangeFilter
                      className="filter"
                      onChange={handleRangeFilterChange}
                    />

                    <CarMultimediaFilter
                      className="filter"
                      onChange={handleMultimediaFilterChange}
                    />

                    <CarSeatsFilter
                      className="filter"
                      onChange={handleSeatsFilterChange}
                    />

                    <CarSpecsFilter
                      className="filter"
                      onChange={handleCarSpecsFilterChange}
                    />

                    <CarType
                      className="filter"
                      onChange={handleCarTypeFilterChange}
                    />

                    <GearboxFilter
                      className="filter"
                      onChange={handleGearboxFilterChange}
                    />

                    <MileageFilter
                      className="filter"
                      onChange={handleMileageFilterChange}
                    />

                    <FuelPolicyFilter
                      className="filter"
                      onChange={handleFuelPolicyFilterChange}
                    />

                    <DepositFilter
                      className="filter"
                      onChange={handleDepositFilterChange}
                    />
                  </>
                )}
              </>
            )}
          </aside>

          <section className="col-2" aria-label="Elérhető járművek">
            <CarList
              carSpecs={carSpecs}
              carType={carType}
              gearbox={gearbox}
              mileage={mileage}
              fuelPolicy={fuelPolicy}
              deposit={deposit}
              loading={loading}
              from={from}
              to={to}
              ranges={ranges}
              multimedia={multimedia}
              rating={rating}
              seats={seats}
              includeComingSoonCars
            />
          </section>
        </div>
      )}

      <VehicleSeoContent />
    </main>

    <Footer />
  </Layout>
)

  // return (
  //   <>
  //     <Layout onLoad={onLoad} strict={false}>
  //       {visible && from && to && (
  //         <div className="search">
  //           <div className="col-1">
  //             {!loading && (
  //               <>
  //                 {/* Map: fixen a cég székhelyére mutat */}
  //                 <Map
  //                   position={COMPANY_POSITION}
  //                   initialZoom={14}
  //                   locations={[]}
  //                   parkingSpots={undefined}
  //                   className="map"
  //                 />

  //                 {/* CarFilter: location nélkül, csak időintervallum + egyéb logika */}
  //                 <CarFilter
  //                   className="filter"
  //                   from={from}
  //                   to={to}
  //                   collapse
  //                   onSubmit={handleCarFilterSubmit}
  //                 />

  //                 <Button
  //                   variant="outlined"
  //                   color="primary"
  //                   startIcon={<FiltersIcon />}
  //                   disableElevation
  //                   fullWidth
  //                   className="btn btn-filters"
  //                   onClick={() => setShowFilters((prev) => !prev)}
  //                 >
  //                   {showFilters ? strings.HILE_FILTERS : strings.SHOW_FILTERS}
  //                 </Button>

  //                 {showFilters && (
  //                   <>
  //                     {/* Nincs SupplierFilter, mert nincsenek beszállítók */}
  //                     <CarRatingFilter className="filter" onChange={handleRatingFilterChange} />
  //                     <CarRangeFilter className="filter" onChange={handleRangeFilterChange} />
  //                     <CarMultimediaFilter className="filter" onChange={handleMultimediaFilterChange} />
  //                     <CarSeatsFilter className="filter" onChange={handleSeatsFilterChange} />
  //                     <CarSpecsFilter className="filter" onChange={handleCarSpecsFilterChange} />
  //                     <CarType className="filter" onChange={handleCarTypeFilterChange} />
  //                     <GearboxFilter className="filter" onChange={handleGearboxFilterChange} />
  //                     <MileageFilter className="filter" onChange={handleMileageFilterChange} />
  //                     <FuelPolicyFilter className="filter" onChange={handleFuelPolicyFilterChange} />
  //                     <DepositFilter className="filter" onChange={handleDepositFilterChange} />
  //                   </>
  //                 )}
  //               </>
  //             )}
  //           </div>

  //           <div className="col-2">
  //             <CarList
  //               carSpecs={carSpecs}
  //               carType={carType}
  //               gearbox={gearbox}
  //               mileage={mileage}
  //               fuelPolicy={fuelPolicy}
  //               deposit={deposit}
  //               loading={loading}
  //               from={from}
  //               to={to}
  //               ranges={ranges}
  //               multimedia={multimedia}
  //               rating={rating}
  //               seats={seats}
  //               includeComingSoonCars
  //             />
  //           </div>
  //         </div>
  //       )}

  //       {noMatch && <NoMatch hideHeader />}
  //     </Layout>

  //     {/* Ha akarod, ide később visszateheted a Progress komponenst */}
  //     {/* {loadingPage && !noMatch && <Progress />} */}
  //   </>
  // )
  // return (
  //   <>
  //     <Layout onLoad={onLoad} strict={false}>
  //       {visible &&  from && to && (
  //         <div className="search">
  //           <div className="col-1">
  //             {!loading && (
  //               <>
  //                 {((pickupLocation.latitude && pickupLocation.longitude)
  //                   || (pickupLocation.parkingSpots && pickupLocation.parkingSpots.length > 0)) && (
  //                     <Map
  //                       position={[pickupLocation.latitude || Number(pickupLocation.parkingSpots![0].latitude), pickupLocation.longitude || Number(pickupLocation.parkingSpots![0].longitude)]}
  //                       initialZoom={10}
  //                       locations={[pickupLocation]}
  //                       parkingSpots={pickupLocation.parkingSpots}
  //                       className="map"
  //                     >
  //                       <ViewOnMapButton onClick={() => setOpenMapDialog(true)} />
  //                     </Map>
  //                   )}

  //                 <CarFilter
  //                   className="filter"
  //                   pickupLocation={pickupLocation}
  //                   dropOffLocation={dropOffLocation}
  //                   from={from}
  //                   to={to}
  //                   collapse
  //                   onSubmit={handleCarFilterSubmit}
  //                 />

  //                 <Button
  //                   variant="outlined"
  //                   color="primary"
  //                   startIcon={<FiltersIcon />}
  //                   disableElevation
  //                   fullWidth
  //                   className="btn btn-filters"
  //                   onClick={() => setShowFilters((prev) => !prev)}
  //                 >
  //                   {showFilters ? strings.HILE_FILTERS : strings.SHOW_FILTERS}
  //                 </Button>

  //                 {
  //                   showFilters && (
  //                     <>
  //                       {!env.HIDE_SUPPLIERS && <SupplierFilter className="filter" suppliers={suppliers} onChange={handleSupplierFilterChange} />}
  //                       <CarRatingFilter className="filter" onChange={handleRatingFilterChange} />
  //                       <CarRangeFilter className="filter" onChange={handleRangeFilterChange} />
  //                       <CarMultimediaFilter className="filter" onChange={handleMultimediaFilterChange} />
  //                       <CarSeatsFilter className="filter" onChange={handleSeatsFilterChange} />
  //                       <CarSpecsFilter className="filter" onChange={handleCarSpecsFilterChange} />
  //                       <CarType className="filter" onChange={handleCarTypeFilterChange} />
  //                       <GearboxFilter className="filter" onChange={handleGearboxFilterChange} />
  //                       <MileageFilter className="filter" onChange={handleMileageFilterChange} />
  //                       <FuelPolicyFilter className="filter" onChange={handleFuelPolicyFilterChange} />
  //                       <DepositFilter className="filter" onChange={handleDepositFilterChange} />
  //                     </>
  //                   )
  //                 }
  //               </>
  //             )}
  //           </div>
  //           <div className="col-2">
  //             <CarList
  //               carSpecs={carSpecs}
  //               suppliers={supplierIds}
  //               carType={carType}
  //               gearbox={gearbox}
  //               mileage={mileage}
  //               fuelPolicy={fuelPolicy}
  //               deposit={deposit}
  //               pickupLocation={pickupLocation._id}
  //               dropOffLocation={dropOffLocation._id}
  //               // pickupLocationName={pickupLocation.name}
  //               loading={loading}
  //               from={from}
  //               to={to}
  //               ranges={ranges}
  //               multimedia={multimedia}
  //               rating={rating}
  //               seats={seats}
  //               // distance={distance}
  //               // onLoad={() => setLoadingPage(false)}
  //               hideSupplier={env.HIDE_SUPPLIERS}
  //               // includeAlreadyBookedCars
  //               includeComingSoonCars
  //             />
  //           </div>
  //         </div>
  //       )}

  //       <MapDialog
  //         pickupLocation={pickupLocation}
  //         openMapDialog={openMapDialog}
  //         onClose={() => setOpenMapDialog(false)}
  //       />

  //       {noMatch && <NoMatch hideHeader />}
  //     </Layout>

  //     {/* {loadingPage && !noMatch && <Progress />} */}
  //   </>
  // )
}

export default Search
