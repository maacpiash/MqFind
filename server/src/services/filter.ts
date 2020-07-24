/*
 * MqFind: Query listings of accommodation near Macquarie University campuses
 * Copyright (C) 2020  Mohammad Abdul Ahad Chowdhury
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import { Accommodation } from '../models/accommodation'
import { IQuery } from '../models/interfaces'
import { cleanUpText } from '../models/helpers'

export default function filterAccommodation(
  option: number | Accommodation,
  query: IQuery,
): boolean {
  const {
    campusName,
    maxRent,
    suburb,
    postcode,
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
    keywords,
  } = query

  if (typeof option === 'number') return false

  if (suburb) {
    const area = cleanUpText(suburb).split(',')
    if (!area.includes(option.suburb.toLowerCase()))
      return false
  }

  if (postcode && option.postcode !== postcode) return false

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

  if (keywords && keywords.length) {
    const { title, suburb, description } = option
    const fields = [title, suburb, description].map(cleanUpText)
    const keys = keywords.map(cleanUpText)
    if (!fields.some(f => keys.some(k => f.includes(k))))
      return false
  }

  return true
}
