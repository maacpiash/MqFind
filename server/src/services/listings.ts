import axios from 'axios'
import { load } from 'cheerio'
import { IResponse } from '../models/interfaces'
import { BASE_URL, CampusNames, HousingOptions, OrderOptions } from '../models/constants'

const queryUrl = BASE_URL + '/Listings/Search?'

export function getHouseType(houseType: string): string {
  const { Properties, Rooms } = HousingOptions
  if (houseType === Properties || houseType === Rooms)
    return `type=${houseType}`
  return ''
}

export function getCampus(campusName: string): string {
  const { NorthRyde, City } = CampusNames
  if (campusName === NorthRyde || campusName === City)
    return `campus=${campusName}`
  return ''
}

export function getMaxRent(maxRent: number): string {
  return `rent=${maxRent}`
}

export function getPageNumber(pageNumber?: number): string {
  return pageNumber ? `Page=${pageNumber}` : ''
}

export function getOrder(option?: string): string {
  if (!option) return ''
  const { closest, cheapest, newest } = OrderOptions
  const base = '&Order='
  if (option === closest || option === cheapest || option === newest)
    return base + option
  return ''
}

export function urlBuilder(
  houseType: string,
  campusName: string,
  maxRent: number,
  pageNumber?: number,
  orderOption?: string,
): string {
  let params = [
    getHouseType(houseType),
    getCampus(campusName),
    getMaxRent(maxRent),
    getPageNumber(pageNumber),
    getOrder(orderOption),
  ]
  params = params.filter(p => p)
  return queryUrl + params.length ? params.join('&') : ''
}

export default async function getPageParsed(
  house: string,
  campus: string,
  max: number,
  pageNum?: number,
  orderOption?: string,
): Promise<IResponse> {
  const baseUrl = urlBuilder(house, campus, max, pageNum, orderOption)
  const $ = await parsePage(baseUrl)
  const numberOfOptions = Number(
    $('div.mb-3 > strong')
      .text()
      .split(' ')[0],
  )
  const pageNumber = pageNum ?? 1
  const links: string[] = getUrls($)
  return { numberOfOptions, pageNumber, links } as IResponse
}

function getUrls(pageContent: CheerioStatic): string[] {
  const links: string[] = []
  pageContent('div.card-body > a').each(function() {
    links.push(BASE_URL + pageContent(this).attr('href'))
  })
  return links
}

async function parsePage(url: string): Promise<CheerioStatic> {
  const content = await axios(url)
  return load(content.data) as CheerioStatic
}
