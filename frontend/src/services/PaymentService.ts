// import * as bookcarsHelper from ':bookcars-helper'
// import env from '@/config/env.config'

// /**
// * Set currency.
// *
// * @param {string} currency
// */
// export const setCurrency = (currency: string) => {
//   if (currency && bookcarsHelper.checkCurrency(currency.toUpperCase())) {
//     localStorage.setItem('bc-fe-currency', currency.toUpperCase())
//   }
// }

// /**
//  * Get currency.
//  *
//  * @returns {string}
//  */
// export const getCurrency = () => {
//   const currency = localStorage.getItem('bc-fe-currency')
//   if (currency && bookcarsHelper.checkCurrency(currency.toUpperCase())) {
//     return currency.toUpperCase()
//   }
//   return env.BASE_CURRENCY
// }

// /**
//  * Return currency symbol.
//  *
//  * @param {string} code
//  * @returns {string|undefined}
//  */
// export const getCurrencySymbol = () => env.CURRENCIES.find((c) => c.code === getCurrency())?.symbol || '$'

// /**
//  * Convert a price to a given currency.
//  *
//  * @async
//  * @param {number} amount
//  * @param {string} to
//  * @returns {Promise<number>}
//  */
// export const convertPrice = async (amount: number) => {
//   const to = getCurrency()

//   if (to !== env.BASE_CURRENCY) {
//     const res = await bookcarsHelper.convertPrice(amount, env.BASE_CURRENCY, to)
//     return res
//   }

//   return amount
// }

// /**
//  * Check if currency is written from right to left.
//  *
//  * @returns {*}
//  */
// export const currencyRTL = () => {
//   const currencySymbol = getCurrencySymbol()
//   const isRTL = bookcarsHelper.currencyRTL(currencySymbol)
//   return isRTL
// }

import * as bookcarsHelper from ':bookcars-helper'
import env from '@/config/env.config'

export const setCurrency = (currency: string) => {
  const normalizedCurrency = currency?.toUpperCase()

  if (normalizedCurrency && bookcarsHelper.checkCurrency(normalizedCurrency)) {
    localStorage.setItem('bc-fe-currency', normalizedCurrency)
  }
}

export const getCurrency = () => {
  const currency = localStorage.getItem('bc-fe-currency')
  const normalizedCurrency = currency?.toUpperCase()

  if (normalizedCurrency && bookcarsHelper.checkCurrency(normalizedCurrency)) {
    return normalizedCurrency
  }

  return env.BASE_CURRENCY
}

export const getCurrencySymbol = () =>
  env.CURRENCIES.find((c) => c.code === getCurrency())?.symbol || 'Ft'

export const convertPrice = async (amount: number) => {
  const normalizedAmount = Number(amount)

  if (!Number.isFinite(normalizedAmount) || normalizedAmount <= 0) {
    return 0
  }

  const to = getCurrency()

  if (to !== env.BASE_CURRENCY) {
    try {
      const res = await bookcarsHelper.convertPrice(normalizedAmount, env.BASE_CURRENCY, to)
      const normalizedResult = Number(res)

      if (!Number.isFinite(normalizedResult) || normalizedResult <= 0) {
        return normalizedAmount
      }

      return normalizedResult
    } catch (err) {
      console.log('[PaymentService.convertPrice] Currency conversion failed. Falling back to base amount.', err)
      return normalizedAmount
    }
  }

  return normalizedAmount
}

export const currencyRTL = () => {
  const currencySymbol = getCurrencySymbol()
  const isRTL = bookcarsHelper.currencyRTL(currencySymbol)
  return isRTL
}
