import axios from 'axios'
import { load } from 'cheerio'
import { Accommodation } from '../models/accommodation'

export default async function getPageParsed(url: string): Promise<any> {
  const content = await axios(url)
  if (!content || !content.data) return {}
  const tds: string[] = []
  const $ = load(content.data)
  $('tbody > tr > td')
    .toArray()
    .map(item => {
      const text = $(item)
        .text()
        .trim()
      if (text) tds.push(text)
    })
  const title =
    ($('h1.listing-title').text() ?? '').trim() || '(No title found)'
  const suburb =
    ($('h2.listing-title-suburb').text() ?? '').trim() || '(No suburb found)'
  const description =
    ($('div.listing-details').text() ?? '').trim() || '(No description found)'
  let photoLink = $('div.listing-cover-photo > img').attr('src') || ''
  if (photoLink) photoLink = 'https:' + photoLink
  const accommodation = new Accommodation(
    title,
    suburb,
    description,
    tds,
    url,
    photoLink,
  )
  accommodation.link = url
  return accommodation
}
