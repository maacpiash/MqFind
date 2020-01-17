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

export default interface IQuery {
  housingOption: HousingOptions
  campusName: CampusNames
  maxRent: number
  bathroom?: number
  leasMin?: number
  leaseMax?: number
}
