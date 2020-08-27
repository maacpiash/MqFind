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
import {
  IAccommodation,
  IBedroom,
  ILeaseDetails,
  IQuery,
  delimeter,
  scrapedKeys,
  WTF,
  CampusNames,
} from '@mqfind/common'
import { tz } from 'moment-timezone'

export function makeAccommodationObject(
  address: string,
  values: string[],
  stats: string[][],
): IAccommodation {
  const acc: any = {}
  if (address !== '(No address found)') {
    const location = address.split(' • ')
    acc.suburb = location[0]
    const remainder = location[1].split(' ')
    acc.postcode = Number(remainder[remainder.length - 1])
  } else {
    acc.suburb = ''
    acc.postcode = 0
  }
  const dict: { [key: string]: string[] } = {}
  let k = 0
  for (let i = 0; i < values.length; i++) {
    if (values[i] === scrapedKeys[k]) k++
    else {
      if (!dict[scrapedKeys[k - 1]]) dict[scrapedKeys[k - 1]] = []
      dict[scrapedKeys[k - 1]].push(values[i])
    }
  }

  // Now, let's remove the unnecessary text from the end of the last value
  dict['Short Stay Option'] = [dict['Short Stay Option']?.[0] ?? '']
  dict['Wheelchair accessible?'] = [dict['Wheelchair accessible?']?.[0] ?? '']

  // Getting rid of all empty elements
  scrapedKeys.forEach(k => (dict[k] = dict[k].filter(Boolean)))

  /*** *** *** vacancy  *** *** ***/
  const occupants = dict['Occupants']?.[0] ?? ''
  const arr = occupants.split(', ')
  acc.vacancy = Number(arr[arr.length - 1].split(' ')[0])

  /*** *** *** lease details  *** *** ***/
  const leaseStr = dict['Lease'][0] ?? ''
  let maxLease: number | undefined, minLease: number
  if (leaseStr.includes('-')) {
    // 'x-y months'
    const range = leaseStr.split(' ') // ['x-y',  'months']
    const numbers = range[0].split('-') // ['x', 'y']
    minLease = Number(numbers[0]) ?? 0
    maxLease = Number(numbers[1]) ?? 0
  } else if (leaseStr.includes('At least')) {
    // 'At least z months'
    minLease = Number(leaseStr.split(' ')[2]) ?? 0
  } else {
    // 'z months'
    minLease = Number(leaseStr.split(' ')[0]) ?? 0
    maxLease = minLease
  }
  const leaseType = dict['Type of Lease']?.[0] ?? ''
  acc.leaseDetails = { minLease, maxLease, leaseType } as ILeaseDetails

  /*** *** *** bedrooms  *** *** ***/
  acc.bedrooms = []
  const bedroomsArray = dict['Bedrooms available'] ?? []
  acc.bedroomNumber = bedroomsArray.length ?? 0
  const bedrooms = bedroomsArray.map(bedroom => bedroom.split(delimeter))
  if (acc.bedroomNumber > 1) bedrooms.forEach(bedroom => bedroom.shift())

  for (const bedroom of bedrooms) {
    const firstLine = bedroom[0].split(' - ') // [ 'Single and Ensuite', '$260 / week' ]
    const vacancyType = firstLine[0]
    const weeklyRate = Number(firstLine[1].split(' / ')[0].split('$')[1])
    const bond = Number(bedroom[1].split('$')[1] ?? '0')
    const availableFrom = tz(
      new Date(bedroom[2].substr(10)),
      'Australia/Sydney',
    ).toDate()
    acc.bedrooms.push({
      vacancyType,
      weeklyRate,
      bond,
      availableFrom,
    } as IBedroom)
  }

  /*** *** *** atomic values  *** *** ***/
  acc.bathroomNumber = Number(dict['Bathrooms']?.[0] ?? '0')
  acc.bedroomFurnishing = dict['Bedroom Furnishing']?.[0] ?? WTF
  acc.houseFurnishing = dict['House Furnishing']?.[0] ?? WTF
  acc.hasInternet = dict['Internet Available']?.[0] === 'Yes'
  acc.heatingCooling = dict['Heating/Cooling']?.[0]?.split(', ') ?? []
  acc.wheelchairAccess = dict['Wheelchair accessible?']?.[0] === 'Yes'
  acc.cantSmoke = dict['Smoking']?.[0] === 'Not permitted'
  acc.safety = dict['Safety'][0]?.split(', ') ?? []
  acc.bills = dict['Included Bills']?.[0] ?? WTF
  acc.utilities = dict['Utilities']?.[0].split(', ') ?? []
  acc.noPets = dict['Animals / Pets']?.[0] === 'Not Allowed'
  const gender = dict['Preferred Gender']?.[0] ?? []
  acc.prefGender = []
  if (gender.includes('Female')) acc.prefGender.push('F')
  if (gender.includes('Male')) acc.prefGender.push('M')
  acc.shortStay = dict['Short Stay Option']?.[0] !== 'Short Stay Not Available'
  acc.commonAreasAccess = dict['Common Areas Accessible']?.[0].split(', ') ?? []
  acc.rentMin = Number(stats[0][1].split('$')[1]) || 0

  const NorthRydeFirst = stats[1].includes('North')
  const CityFirst = stats[1].includes('City')
  const first = Number(stats[1][0])
  const second = Number(stats[2][0])

  acc.distance = {
    [CampusNames.NorthRyde]: NorthRydeFirst ? first : second,
    [CampusNames.City]: CityFirst ? first : second,
  }

  return acc as IAccommodation
}

export function queryBuilder(object: any): IQuery {
  const { housingOption, campusName, maxRent } = object
  return {
    housingOption,
    campusName,
    maxRent: Number(maxRent),
    suburb: object.suburb || undefined,
    postcode: Number(object.postcode) || undefined,
    bathroom: Number(object.bathroom) || undefined,
    ensuite: object.ensuite ? Boolean(object.ensuite) : undefined,
    leaseMin: Number(object.leaseMin) || undefined,
    leaseMax: Number(object.leaseMax) || undefined,
    distanceMax: Number(object.distanceMax) || undefined,
    vacancy: Number(object.vacancy) || undefined,
    bedroom: Number(object.bedroom) || undefined,
    heating: object.heating ? Boolean(object.heating) : undefined,
    cooling: object.cooling ? Boolean(object.cooling) : undefined,
    internet: object.internet ? Boolean(object.internet) : undefined,
    canSmoke: object.canSmoke ? Boolean(object.canSmoke) : undefined,
    prefGender: object.prefGender
      ? object.prefGender.toUpperCase().split('')
      : [],
    wheelchairAccess: object.wheelchairAccess
      ? Boolean(object.wheelchairAccess)
      : undefined,
    keywords: object.keywords
      ? object.keywords.split(',').map(cleanUpText)
      : undefined,
  } as IQuery
}

export function cleanUpText(word: string): string {
  return word.trim().toLowerCase()
}
