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
import GetListingLinks from './listings'
import FilterListings from './parser'
import { IQuery } from '../models/interfaces'
import { Accommodation } from '../models/accommodation'
import { OptionsPerPage } from '../models/constants'
import filterAccommodation from './filter'

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
  return getListings(query)
    .then(array => {
      let promise = getListings(query)
      const max = (array[0] as number) / OptionsPerPage + 1
      for (let i = 2; i < max; i++) {
        promise = promise.then(arr => list(query, arr, i))
      }
      return promise
    })
    .then(array => array.filter(option => filterAccommodation(option, query)))
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
