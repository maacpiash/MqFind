import GetListingLinks from './listings'
import FilterListings from './parser'
import { IQuery } from '../models/interfaces'
import { Accommodation } from '../models/accommodation'
import { OptionsPerPage } from '../models/constants'

export function getListings(
  query: IQuery,
  pageNum?: number,
): Promise<(Accommodation | number)[]> {
  return GetListingLinks(
    query.housingOption,
    query.campusName,
    query.maxRent,
    pageNum,
  ).then(resp =>
    Promise.all([
      new Promise(res => res(resp.numberOfOptions)),
      ...resp.links.map(FilterListings),
    ]),
  )
}

export default function getAllListings(
  query: IQuery,
): Promise<(number | Accommodation)[]> {
  return getListings(query).then(array => {
    let promise = getListings(query)
    const max = (array[0] as number) / OptionsPerPage + 1
    for (let i = 2; i < max; i++) {
      promise = promise.then(arr => list(query, arr, i))
    }
    return promise
  })
}

function list(
  query: IQuery,
  arr: (number | Accommodation)[],
  page: number,
): Promise<Accommodation[]> {
  return getListings(query, page).then(
    newarr =>
      arr
        .concat(newarr)
        .filter(item => typeof item !== 'number') as Accommodation[],
  )
}
