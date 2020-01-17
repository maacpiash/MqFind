import axios from 'axios'
import { load } from 'cheerio'
import { Accommodation } from '../models/accommodation'

export default async function getPageParsed(url: string): Promise<any> {
  const content = await axios(url)
  if (!content || !content.data) return []
  const tds: string[] = []
  const $ = load(content.data)
  $('tbody > tr > td')
    .toArray()
    .map(item => {
      const text = $(item).text()
      if (text) tds.push(text.trim())
    })
  let photoLink = $('div.listing-cover-photo > img').attr('src') || ''
  if (photoLink) photoLink = 'https:' + photoLink
  const accommodation = new Accommodation('TITLE', tds, url, photoLink)
  accommodation.link = url
  return accommodation
}
