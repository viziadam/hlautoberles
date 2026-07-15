import * as bookcarsTypes from ':bookcars-types'

/**
 * A kereső alapértelmezett időszaka:
 * átvétel 3 nap múlva 10:00-kor,
 * leadás további 3 nap múlva 10:00-kor.
 */
const getDefaultRentalPeriod = () => {
  const from = new Date()

  from.setDate(from.getDate() + 3)
  from.setHours(10, 0, 0, 0)

  const to = new Date(from)

  to.setDate(to.getDate() + 3)

  return {
    from,
    to,
  }
}

export const createVehicleSearchUrl = (
  ranges: bookcarsTypes.CarRange[],
) => {
  const { from, to } = getDefaultRentalPeriod()

  const params = new URLSearchParams({
    from: from.toISOString(),
    to: to.toISOString(),
    ranges: ranges.join(','),
  })

  return (
    `/autoberles-budapest?${params.toString()}`
    + '#elerheto-jarmuvek'
  )
}
