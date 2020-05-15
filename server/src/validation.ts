import { object, string, number, bool } from '@hapi/joi'
import { CampusNames, HousingOptions } from './models/constants'

const querySchema = object({
  housingOption: string()
    .valid(HousingOptions.Properties, HousingOptions.Rooms)
    .required(),
  campusName: string()
    .valid(CampusNames.City, CampusNames.NorthRyde)
    .required(),
  maxRent: number()
    .integer()
    .min(0)
    .default(200)
    .required(),
  suburb: string(),
  postcode: number()
    .min(1001)
    .max(3707), // https://postcodes-australia.com/state-postcodes/nsw
  bathroom: number().min(1),
  ensuite: bool(),
  leaseMin: number().min(1),
  leaseMax: number().min(1),
  distanceMax: number().min(0.1),
  vacancy: number().min(1),
  bedroom: number().min(1),
  heating: bool(),
  cooling: bool(),
  internet: bool(),
  canSmoke: bool(),
  prefGender: string().valid('F', 'F,M', 'M'),
  wheelchairAccess: bool(),
})

export default querySchema
