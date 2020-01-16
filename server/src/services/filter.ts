import axios from 'axios'
import { load } from 'cheerio'
import { Accommodation } from '../models/accommodation'
// import cleanup from './cleanup'

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
  const accommodation = new Accommodation('TITLE', tds)
  const photoLink = $('div.listing-cover-photo > img').attr('src') || false
  if (photoLink) accommodation.photoLink = 'https:' + photoLink
  accommodation.link = url
  return accommodation
}
