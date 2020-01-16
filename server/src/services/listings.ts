import axios from 'axios'
import { load } from 'cheerio'
import { BASE_URL, CampusNames, HousingOptions } from '../models/constants'

const queryUrl = BASE_URL + '/Listings/Search?'

export function getHouseType(houseType: string): string {
  const { Properties, Rooms } = HousingOptions
  if (houseType === Properties || houseType === Rooms)
    return `type=${houseType}&`
  return ''
}

export function getCampus(campusName: string): string {
  const { NorthRyde, City } = CampusNames
  if (campusName === NorthRyde || campusName === City)
    return `campus=${campusName}&`
  return ''
}

export function getMaxRent(maxRent: number): string {
  return `rent=${maxRent}`
}

export function urlBuilder(
  houseType: string,
  campusName: string,
  maxRent: number,
): string {
  const fullUrl =
    queryUrl +
    getHouseType(houseType) +
    getCampus(campusName) +
    getMaxRent(maxRent)
  return fullUrl
}

export default async function getPageParsed(
  house: string,
  campus: string,
  max: number,
): Promise<any> {
  const content = await axios(urlBuilder(house, campus, max))
  if (!content || !content.data) return []
  const links: string[] = []
  const $ = load(content.data)
  const data: { [key: string]: string[] | number } = {}
  data['numberOfOptions'] = Number(
    $('div.mb-3 > strong')
      .text()
      .split(' ')[0],
  )
  $('div.card-body > a').each(function() {
    links.push(BASE_URL + $(this).attr('href'))
  })
  data['links'] = links
  return data
}
