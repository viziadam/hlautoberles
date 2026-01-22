import React, { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  OutlinedInput,
  InputLabel,
  FormControl,
  FormHelperText,
  Button,
  Paper,
  Checkbox,
  Link,
  FormControlLabel,
  RadioGroup,
  Radio,
  CircularProgress,
  Switch,
} from '@mui/material'
import {
  DirectionsCar as CarIcon,
  Person as DriverIcon,
  Settings as PaymentOptionsIcon,
  Payment as LicenseIcon,
  AssignmentTurnedIn as ChecklistIcon,
} from '@mui/icons-material'
import { format } from 'date-fns'
import { fr, enUS, es } from 'date-fns/locale'
// import {
//   EmbeddedCheckoutProvider,
//   EmbeddedCheckout,
// } from '@stripe/react-stripe-js'
// import { loadStripe } from '@stripe/stripe-js'
// import { PayPalButtons } from '@paypal/react-paypal-js'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import validator from 'validator'
import { createSchema, FormFields } from '@/models/CheckoutForm'
import CarList from '@/components/CarList'
import * as bookcarsTypes from ':bookcars-types'
import * as bookcarsHelper from ':bookcars-helper'
import env from '@/config/env.config'
import * as BookingService from '@/services/BookingService'
import { strings as commonStrings } from '@/lang/common'
import { strings as csStrings } from '@/lang/cars'
import { strings } from '@/lang/checkout'
import * as helper from '@/utils/helper'
import * as UserService from '@/services/UserService'
import * as CarService from '@/services/CarService'
// import * as LocationService from '@/services/LocationService'
import * as PaymentService from '@/services/PaymentService'
// import * as StripeService from '@/services/StripeService'
// import * as PayPalService from '@/services/PayPalService'
import { useRecaptchaContext, RecaptchaContextType } from '@/context/RecaptchaContext'
import Layout from '@/components/Layout'
import Error from '@/components/Error'
import Progress from '@/components/Progress'
import CheckoutStatus from '@/components/CheckoutStatus'
import NoMatch from './NoMatch'
import CheckoutOptions from '@/components/CheckoutOptions'
import Footer from '@/components/Footer'
import Unauthorized from '@/components/Unauthorized'

import '@/assets/css/checkout.css'

//
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
//
// const stripePromise = env.PAYMENT_GATEWAY === bookcarsTypes.PaymentGateway.Stripe ? loadStripe(env.STRIPE_PUBLISHABLE_KEY) : null

const Checkout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { reCaptchaLoaded, generateReCaptchaToken } = useRecaptchaContext() as RecaptchaContextType

  const [user, setUser] = useState<bookcarsTypes.User>()
  const [car, setCar] = useState<bookcarsTypes.Car>()
  // const [pickupLocation, setPickupLocation] = useState<bookcarsTypes.Location>()
  // const [dropOffLocation, setDropOffLocation] = useState<bookcarsTypes.Location>()
  const [from, setFrom] = useState<Date>()
  const [to, setTo] = useState<Date>()
  const [visible, setVisible] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const [language, setLanguage] = useState(env.DEFAULT_LANGUAGE)
  const [noMatch, setNoMatch] = useState(false)

  const [price, setPrice] = useState(0)
  const [depositPrice, setDepositPrice] = useState(0)
  const [loadingPage, setLoadingPage] = useState(true)
  const [recaptchaError, setRecaptchaError] = useState(false)
  const [authenticatedError, setAuthenticatedError] = useState(false)
  const [adManuallyChecked, setAdManuallyChecked] = useState(false)

  const [bookingId, setBookingId] = useState<string>()


  const birthDateRef = useRef<HTMLInputElement | null>(null)


  const _fr = language === 'fr'
  const _es = language === 'es'
  const _locale = _fr ? fr : _es ? es : enUS
  const _format = _fr ? 'eee d LLL yyyy kk:mm' : _es ? 'eee, d LLLL yyyy HH:mm' : 'eee, d LLL yyyy, p'
  const bookingDetailHeight = env.SUPPLIER_IMAGE_HEIGHT + 10
  const days = bookcarsHelper.days(from, to)
  const daysLabel = from && to && `${helper.getDaysShort(days)} (${bookcarsHelper.capitalize(format(from, _format, { locale: _locale }))} - ${bookcarsHelper.capitalize(format(to, _format, { locale: _locale }))})`

  const schema = createSchema(car)

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    clearErrors,
    setFocus,
    trigger,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    shouldUnregister: false,
     defaultValues: {
    //   additionalDriverEmail: '',
    //   additionalDriverPhone: '',
    chauffeurRequested: false,
    toolsIncluded: false,
     }
  })

  // const additionalDriverEmail = useWatch({ control, name: 'additionalDriverEmail' })
  // const additionalDriverPhone = useWatch({ control, name: 'additionalDriverPhone' })

  // const additionalDriver = useWatch({ control, name: 'additionalDriver' })
  // const payLater = useWatch({ control, name: 'payLater' })
  const payDeposit = useWatch({ control, name: 'payDeposit' })
  const payInFull = useWatch({ control, name: 'payInFull' })
  const toolsIncluded = useWatch({ control, name: 'toolsIncluded' })
  const chauffeurRequested = useWatch({ control, name: 'chauffeurRequested' })

  const onSubmit = async (data: FormFields) => {
    try {
      if (!car || !from || !to) {
        helper.error()
        return
      }

      let recaptchaToken = ''
      if (reCaptchaLoaded) {
        recaptchaToken = await generateReCaptchaToken()
        if (!(await helper.verifyReCaptcha(recaptchaToken))) {
          recaptchaToken = ''
        }
      }

      if (env.RECAPTCHA_ENABLED && !recaptchaToken) {
        setRecaptchaError(true)
        return
      }

      if (!authenticated) {
        // check email
        // const status = await UserService.validateEmail({ email: data.email! })
        // if (status === 200) {
        //   setEmailRegistered(false)
        //   setEmailInfo(true)
        // } else {
        //   setEmailRegistered(true)
        //   setEmailInfo(false)
        //   return
        // }
        setAuthenticatedError(true);
        return
      }

      // if (car.supplier.licenseRequired && !license) {
      //   setLicenseRequired(true)
      //   return
      // }

      let driver: bookcarsTypes.User | undefined
      // let _additionalDriver: bookcarsTypes.AdditionalDriver | undefined

      if (!authenticated) {
        // driver = {
        //   // email: data.email,
        //   // phone: data.phone,
        //   // fullName: data.fullName!,
        //   // birthDate: data.birthDate,
        //   // language: UserService.getLanguage(),
        //   // license: license || undefined,
        // }
      }

      let amount = price
      if (payDeposit) {
        amount = depositPrice
      } else if (payInFull) {
        amount = price + depositPrice
      }

      // const basePrice = await bookcarsHelper.convertPrice(amount, PaymentService.getCurrency(), env.BASE_CURRENCY)
      const basePrice = price;
      const booking: bookcarsTypes.Booking = {
        // supplier: car.supplier._id as string,
        car: car._id,
        driver: authenticated ? user?._id : undefined,
        // pickupLocation: pickupLocation._id,
        // dropOffLocation: dropOffLocation._id,
        from,
        to,
        status: bookcarsTypes.BookingStatus.Pending,
        cancellation: data.cancellation,
        amendments: data.amendments,
        theftProtection: data.theftProtection,
        collisionDamageWaiver: data.collisionDamageWaiver,
        fullInsurance: data.fullInsurance,
        toolsIncluded: data.toolsIncluded,
        chauffeurRequested: data.chauffeurRequested,
        // additionalDriver,
        price: basePrice,
      }

      let _customerId: string | undefined
      let _sessionId: string | undefined
   

      booking.isDeposit = payDeposit
      booking.isPayedInFull = payInFull

      const payload: bookcarsTypes.CheckoutPayload = {
  driver,
  booking,
  // additionalDriver: _additionalDriver,
  payLater: true,            // <- fixen true
  // sessionId: undefined,
  // customerId: undefined,
  // payPal: false,
}

      const { status, bookingId: _bookingId } = await BookingService.checkout(payload)

      if (status === 200) {
        // if (payLater) {
        //   setVisible(false)
        //   setSuccess(true)
        // }
        setBookingId(_bookingId)
        // setSessionId(_sessionId)
      } else {
        helper.error()
      }
    } catch (err) {
      helper.error(err)
    }
  }

  const onError = () => {
    // const firstErrorField = Object.keys(errors)[0] as keyof FormFields
    // if (firstErrorField) {
    //   if (firstErrorField === 'birthDate' && birthDateRef.current) {
    //     birthDateRef.current.focus()
    //   }
    //     setFocus(firstErrorField)
      
    // }
  }

  const onLoad = async (_user?: bookcarsTypes.User) => {
    setUser(_user)
    setAuthenticated(_user !== undefined)
    setLanguage(UserService.getLanguage())

    const { state } = location
    if (!state) {
      setNoMatch(true)
      return
    }

    const { carId } = state
    // const { pickupLocationId } = state
    // const { dropOffLocationId } = state
    const { from: _from } = state
    const { to: _to } = state

    if (!carId || !_from || !_to) {
      setNoMatch(true)
      return
    }

    let _car
    

    try {
      _car = await CarService.getCar(carId)
      if (!_car) {
        setNoMatch(true)
        return
      }


      const priceChangeRate =  0
      const _price = await PaymentService.convertPrice(bookcarsHelper.calculateTotalPrice(_car, _from, _to, priceChangeRate))
      let _depositPrice = _car.deposit > 0 ? await PaymentService.convertPrice(_car.deposit) : 0
      _depositPrice += _depositPrice * (priceChangeRate / 100)

      const included = (val: number) => val === 0

      setCar(_car)
      setPrice(_price)
      setDepositPrice(_depositPrice)
      // setPickupLocation(_pickupLocation)
      // setDropOffLocation(_dropOffLocation)
      setFrom(_from)
      setTo(_to)
      setValue('cancellation', included(_car.cancellation))
      setValue('amendments', included(_car.amendments))
      setValue('theftProtection', included(_car.theftProtection))
      setValue('collisionDamageWaiver', included(_car.collisionDamageWaiver))
      setValue('fullInsurance', included(_car.fullInsurance))
      
      setVisible(true)
    } catch (err) {
      helper.error(err)
    }
  }

  return (
    <>
      <Layout onLoad={onLoad} strict={false}>
        {!user?.blacklisted && visible && car && from && to  && (
          <>
            <div className="checkout">
              <Paper className="checkout-form" elevation={10}>
                <h1 className="checkout-form-title">{strings.BOOKING_HEADING}</h1>
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                  <div>
                  
                    <CarList
                      cars={[car]}
                      // pickupLocationName={pickupLocation.name}
                      // distance={distance}
                      from={from} 
                      to={to}
                      hidePrice
                      sizeAuto
                      onLoad={() => setLoadingPage(true)}
                      // hideSupplier={env.HIDE_SUPPLIERS}
                    />

                    <CheckoutOptions
                      car={car}
                      from={from}
                      to={to}
                      language={language}
                      clientSecret={null}
                      payPalLoaded={true}
                      onPriceChange={(value) => setPrice(value)}
                      onAdManuallyCheckedChange={(value) => setAdManuallyChecked(value)}
                      onCancellationChange={(value) => setValue('cancellation', value)}
                      onAmendmentsChange={(value) => setValue('amendments', value)}
                      onTheftProtectionChange={(value) => setValue('theftProtection', value)}
                      onCollisionDamageWaiverChange={(value) => setValue('collisionDamageWaiver', value)}
                      onFullInsuranceChange={(value) => setValue('fullInsurance', value)}
                      
                    />

                    <div className="checkout-details-container">
                      <div className="checkout-info">
                        <CarIcon />
                        <span>{strings.BOOKING_DETAILS}</span>
                      </div>
                      <div className="checkout-details">
                        <div className="checkout-detail" style={{ height: bookingDetailHeight }}>
                          <span className="checkout-detail-title">{strings.DAYS}</span>
                          <div className="checkout-detail-value">
                            {daysLabel}
                          </div>
                        </div>
                        {/* <div className="checkout-detail" style={{ height: bookingDetailHeight }}>
                          <span className="checkout-detail-title">{commonStrings.PICK_UP_LOCATION}</span>
                          <div className="checkout-detail-value">-</div>
                        </div>
                        <div className="checkout-detail" style={{ height: bookingDetailHeight }}>
                          <span className="checkout-detail-title">{commonStrings.DROP_OFF_LOCATION}</span>
                          <div className="checkout-detail-value">-</div>
                        </div> */}
                        <div className="checkout-detail" style={{ height: bookingDetailHeight }}>
                          <span className="checkout-detail-title">{strings.CAR}</span>
                          <div className="checkout-detail-value">{`${car.name} (${bookcarsHelper.formatPrice(price / days, commonStrings.CURRENCY, language)}${commonStrings.DAILY})`}</div>
                        </div>
                        {/* {!env.HIDE_SUPPLIERS && (
                          <div className="checkout-detail" style={{ height: bookingDetailHeight }}>
                            <span className="checkout-detail-title">{commonStrings.SUPPLIER}</span>
                            <div className="checkout-detail-value">
                            </div>
                          </div>
                        )} */}
                        <div className="checkout-detail" style={{ height: bookingDetailHeight }}>
                          <span className="checkout-detail-title">{strings.COST}</span>
                          <div className="checkout-detail-value booking-price">{bookcarsHelper.formatPrice(price, commonStrings.CURRENCY, language)}</div>
                        </div>
                        <FormControl fullWidth margin="dense" className="checkbox-fc">
                                                <FormControlLabel
                                                  control={
                                                    <Switch
                                                      checked={toolsIncluded}
                                                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setValue('toolsIncluded', event.target.checked)}}
                                                      color="primary"
                                                      disabled={!car.toolsRentable}
                                                    />
                                                  }
                                                  label={commonStrings.TOOLS_INCLUDED}
                                                  className="checkbox-fcl"
                                                />
                                  </FormControl>
                    
                                  <FormControl fullWidth margin="dense" className="checkbox-fc">
                                                <FormControlLabel
                                                  control={
                                                    <Switch
                                                      checked={chauffeurRequested}
                                                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setValue('chauffeurRequested', event.target.checked)}}
                                                      color="primary"
                                                      disabled={false}
                                                    />
                                                  }
                                                  label={commonStrings.CHAUFFEUR_REQUESTED}
                                                  className="checkbox-fcl"
                                                />
                                  </FormControl>
                      </div>
                    </div>

                    

                    <div className="payment-info">
                      <div className="payment-info-title">
                        {
                          payDeposit ? strings.DEPOSIT : `${strings.PRICE_FOR} ${days} ${days > 1 ? strings.DAYS : strings.DAY}`
                        }
                      </div>
                      <div className="payment-info-price">
                        {
                          bookcarsHelper.formatPrice(
                            payDeposit ? depositPrice
                              : payInFull ? (price + depositPrice)
                                : price
                            , commonStrings.CURRENCY, language)
                        }
                      </div>
                    </div>

                    
                    <div className="checkout-buttons">
                      
                        <Button
                            type="submit"
                            variant="contained"
                            className="btn-checkout btn-margin-bottom"
                            aria-label="Checkout"
                            disabled={isSubmitting}
                        >
                          {isSubmitting ? <CircularProgress color="inherit" size={24} /> : strings.BOOK}
                      </Button>
                      <Button
                        variant="outlined"
                        color="primary"
                        className="btn-cancel btn-margin-bottom"
                        aria-label="Cancel"
                        onClick={async () => {
                          try {
                            if (bookingId ) {
                              //
                              // Delete temporary booking on cancel.
                              // Otherwise, temporary bookings are
                              // automatically deleted through a TTL index.
                              //
                              //  await BookingService.deleteTempBooking(bookingId)
                            }
                            // if (!authenticated && license) {
                            //   await UserService.deleteTempLicense(license)
                            // }
                          } catch (err) {
                            helper.error(err)
                          } finally {
                            navigate('/')
                          }
                        }}
                      >
                        {commonStrings.CANCEL}
                      </Button>
                    </div>
                  </div>
                  <div className="form-error">
                    {/* {paymentFailed && <Error message={strings.PAYMENT_FAILED} />} */}
                    {recaptchaError && <Error message={commonStrings.RECAPTCHA_ERROR} />}
                    {authenticatedError && <Error message={commonStrings.AUTHENTICATED_ERROR} />}
                    {/* {licenseRequired && <Error message={strings.LICENSE_REQUIRED} />} */}
                  </div>
                </form>

                { bookingId && (
          <CheckoutStatus
            bookingId={bookingId}
            language={language}
            // payLater={payLater}
            status="success"
            className="status"
          />
        )}
              </Paper>
            </div>

            <Footer />
          </>
        )}

        {user?.blacklisted && <Unauthorized />}

        {noMatch && <NoMatch hideHeader />}

        {/* { bookingId && (
          <CheckoutStatus
            bookingId={bookingId}
            language={language}
            // payLater={payLater}
            status="success"
            className="status"
          />
        )} */}

        {/* {payPalProcessing && <Backdrop text={strings.CHECKING} />} */}

        {/* <MapDialog
          pickupLocation={pickupLocation}
          openMapDialog={openMapDialog}
          onClose={() => setOpenMapDialog(false)}
        /> */}
      </Layout>

      {loadingPage && !noMatch && <Progress />}
    </>
  )
}

export default Checkout
