import GetListingLinks from './listings'
import FilterListings from './parser'
import IQuery from '../models/interfaces'

export default function getListings(query: IQuery): Promise<any> {
  const { housingOption, campusName, maxRent } = query
  return GetListingLinks(housingOption, campusName, maxRent).then(obj =>
    Promise.all((obj?.links ?? []).map(FilterListings)),
  )
}
