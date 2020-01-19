import GetListingLinks from './listings'
import FilterListings from './parser'
import { IQuery } from '../models/interfaces'

export default function getListings(
  query: IQuery,
  pageNum?: number,
): Promise<any> {
  return GetListingLinks(
    query.housingOption,
    query.campusName,
    query.maxRent,
    pageNum,
  ).then(resp => Promise.all(resp.links.map(FilterListings)))
}
