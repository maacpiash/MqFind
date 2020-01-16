import GetListingLinks from './listings'
import FilterListings from './filter'
import IQuery from '../models/query'

export default function getListings(query: IQuery): Promise<any> {
  const { housingOption, campusName, maxRent } = query
  return GetListingLinks(housingOption, campusName, maxRent).then(obj =>
    Promise.all((obj?.links ?? []).map(FilterListings)),
  )
}
