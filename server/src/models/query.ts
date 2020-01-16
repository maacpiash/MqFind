import { HousingOptions, CampusNames } from './constants'

export default interface IQuery {
  housingOption: HousingOptions
  campusName: CampusNames
  maxRent: number
  bathroom: number | undefined
  leasMin: number | undefined
  leaseMax: number | undefined
}
