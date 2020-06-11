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
import moment from 'moment-timezone'
import { delimeter, scrapedKeys, WTF, CampusNames } from './constants'
import { IBedroom, ILeaseDetails } from './interfaces'

export class Accommodation {
  title: string
  suburb: string
  postcode: number
  description: string
  photoLink: string
  vacancy: number
  distance: { [campusName in CampusNames]: number }
  leaseDetails: ILeaseDetails
  bedroomNumber: number
  bedrooms: IBedroom[]
  rentMin: number
  heatingCooling: string[]
  wheelchairAccess: boolean
  bathroomNumber: number
  bedroomFurnishing: string
  houseFurnishing: string
  hasInternet: boolean
  cantSmoke: boolean
  safety: string[]
  bills: string
  utilities: string[]
  noPets: boolean
  prefGender: string[] = []
  shortStay: boolean
  commonAreasAccess: string[]
  link: string

  constructor(
    title: string,
    address: string,
    description: string,
    values: string[],
    link: string,
    photoLink: string,
    stats: string[][],
  ) {
    this.title = title
    if (address !== '(No address found)') {
      const location = address.split(' • ')
      this.suburb = location[0]
      const remainder = location[1].split(' ')
      this.postcode = Number(remainder[remainder.length - 1])
    } else {
      this.suburb = ''
      this.postcode = 0
    }
    this.description = description
    this.link = link
    this.photoLink = photoLink
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
    this.vacancy = Number(arr[arr.length - 1].split(' ')[0])

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
    this.leaseDetails = { minLease, maxLease, leaseType } as ILeaseDetails

    /*** *** *** bedrooms  *** *** ***/
    this.bedrooms = []
    const bedroomsArray = dict['Bedrooms available'] ?? []
    this.bedroomNumber = bedroomsArray.length ?? 0
    const bedrooms = bedroomsArray.map(bedroom => bedroom.split(delimeter))
    if (this.bedroomNumber > 1) bedrooms.forEach(bedroom => bedroom.shift())

    for (const bedroom of bedrooms) {
      const firstLine = bedroom[0].split(' - ') // [ 'Single and Ensuite', '$260 / week' ]
      const vacancyType = firstLine[0]
      const weeklyRate = Number(firstLine[1].split(' / ')[0].split('$')[1])
      const bond = Number(bedroom[1].split('$')[1] ?? '0')
      const availableFrom = moment
        .tz(new Date(bedroom[2].substr(10)), 'Australia/Sydney')
        .toDate()
      this.bedrooms.push({
        vacancyType,
        weeklyRate,
        bond,
        availableFrom,
      } as IBedroom)
    }

    /*** *** *** atomic values  *** *** ***/
    this.bathroomNumber = Number(dict['Bathrooms']?.[0] ?? '0')
    this.bedroomFurnishing = dict['Bedroom Furnishing']?.[0] ?? WTF
    this.houseFurnishing = dict['House Furnishing']?.[0] ?? WTF
    this.hasInternet = dict['Internet Available']?.[0] === 'Yes'
    this.heatingCooling = dict['Heating/Cooling']?.[0]?.split(', ') ?? []
    this.wheelchairAccess = dict['Wheelchair accessible?']?.[0] === 'Yes'
    this.cantSmoke = dict['Smoking']?.[0] === 'Not permitted'
    this.safety = dict['Safety'][0]?.split(', ') ?? []
    this.bills = dict['Included Bills']?.[0] ?? WTF
    this.utilities = dict['Utilities']?.[0].split(', ') ?? []
    this.noPets = dict['Animals / Pets']?.[0] === 'Not Allowed'
    const gender = dict['Preferred Gender']?.[0] ?? []
    if (gender.includes('Female')) this.prefGender.push('F')
    if (gender.includes('Male')) this.prefGender.push('M')
    this.shortStay =
      dict['Short Stay Option']?.[0] !== 'Short Stay Not Available'
    this.commonAreasAccess =
      dict['Common Areas Accessible']?.[0].split(', ') ?? []
    this.rentMin = Number(stats[0][1].split('$')[1]) || 0

    const NorthRydeFirst = stats[1].includes('North Ryde')
    const CityFirst = stats[1].includes('City')
    const first = Number(stats[1][0])
    const second = Number(stats[2][0])

    this.distance = {
      [CampusNames.NorthRyde]: NorthRydeFirst ? first : second,
      [CampusNames.City]: CityFirst ? first : second,
    }
  }
}
