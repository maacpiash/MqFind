import GetDetails from './services'
import { HousingOptions, CampusNames } from './models/constants'
import { IQuery } from './models/interfaces'

const query: IQuery = {
  housingOption: HousingOptions.Rooms,
  campusName: CampusNames.NorthRyde,
  maxRent: 200,
  bathroom: 0,
  leasMin: 0,
  leaseMax: 0,
}

GetDetails(query)
  .then(str => JSON.stringify(str, null, 2))
  .then(console.log)
  .catch(console.error)
