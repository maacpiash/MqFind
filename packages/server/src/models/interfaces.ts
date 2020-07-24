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
import { HousingOptions, CampusNames } from './constants'
import { cleanUpText } from './helpers'

export interface IBedroom {
  vacancyType: string
  weeklyRate: number
  bond: number
  availableFrom: Date
}

export interface ILeaseDetails {
  maxLease?: number
  minLease: number
  leaseType: string
}

export interface IResponse {
  numberOfOptions: number
  pageNumber: number
  links: string[]
}

export interface IQuery {
  housingOption: HousingOptions
  campusName: CampusNames
  maxRent: number
  suburb?: string
  postcode?: number
  bathroom?: number
  ensuite?: boolean
  leaseMin?: number
  leaseMax?: number
  distanceMax?: number
  vacancy?: number
  bedroom?: number
  heating?: boolean
  cooling?: boolean
  internet?: boolean
  cantSmoke?: boolean
  prefGender?: string[]
  wheelchairAccess?: boolean
  keywords?: string[]
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
