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

export interface IAccommodation {
  title: string
  suburb: string
  postcode: number
  description: string
  photoLinks: string[]
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
  prefGender: string[]
  shortStay: boolean
  commonAreasAccess: string[]
  link: string
}
