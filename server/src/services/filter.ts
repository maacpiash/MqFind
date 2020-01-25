import { Accommodation } from '../models/accommodation'
import { IQuery } from '../models/interfaces'

export default function filterAccommodation(
  option: number | Accommodation,
  query: IQuery,
): boolean {
  const {
    campusName,
    maxRent,
    bathroom,
    ensuite,
    leaseMin,
    leaseMax,
    distanceMax,
    vacancy,
    bedroom,
    heating,
    cooling,
    internet,
    cantSmoke,
    prefGender,
    wheelchairAccess,
  } = query

  if (typeof option === 'number') return true

  if (bathroom !== undefined && option.bathroomNumber < bathroom) return false

  if (ensuite) {
    const bedrooms = option.bedrooms.filter(
      br =>
        br.vacancyType.toLowerCase().includes('ensuite') &&
        br.weeklyRate <= maxRent,
    )
    if (bedrooms.length === 0) return false
  }

  if (leaseMin !== undefined && option.leaseDetails.minLease < leaseMin)
    return false

  if (
    leaseMax !== undefined &&
    option.leaseDetails.maxLease !== undefined &&
    option.leaseDetails.maxLease > leaseMax
  )
    return false

  if (distanceMax !== undefined && option.distance[campusName] > distanceMax)
    return false

  if (vacancy !== undefined && option.vacancy < vacancy) return false

  if (bedroom !== undefined && bedroom < option.bedroomNumber) return false

  if (heating !== undefined || cooling !== undefined) {
    const facilities = option.heatingCooling.map(v => v.toLowerCase())
    if (heating !== facilities.includes('no heating')) return false
    if (cooling !== facilities.includes('no cooling')) return false
  }

  if (internet !== undefined && internet !== option.hasInternet) return false

  if (cantSmoke !== undefined && cantSmoke !== option.cantSmoke) return false

  if (prefGender !== undefined) {
    if (prefGender.includes('M') && !option.prefGender.includes('M'))
      return false
    if (prefGender.includes('F') && !option.prefGender.includes('F'))
      return false
  }

  if (
    wheelchairAccess !== undefined &&
    wheelchairAccess !== option.wheelchairAccess
  )
    return false

  return true
}
