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
  bathroom?: number
  leasMin?: number
  leaseMax?: number
}
