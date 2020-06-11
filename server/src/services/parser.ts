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
import axios from 'axios'
import { load } from 'cheerio'
import { Accommodation } from '../models/accommodation'

export default async function getPageParsed(url: string): Promise<any> {
  const content = await axios(url)
  if (!content || !content.data) return {}
  const $ = load(content.data)
  const tds = $('tbody > tr > td')
    .toArray()
    .map(item =>
      $(item)
        .text()
        .trim(),
    )
    .filter(p => p)
  const stats = $('div.stat')
    .toArray()
    .map(item =>
      $(item)
        .text()
        .trim()
        .split(' '),
    )
    .map(t => t.filter(p => p).map(d => d.trim()))
  const title =
    ($('h1.listing-title').text() ?? '').trim() || '(No title found)'
  const address =
    ($('h2.listing-title-suburb').text() ?? '').trim() || '(No address found)'
  const description =
    ($('div.listing-details').text() ?? '').trim() || '(No description found)'
  let photoLink = $('div.listing-cover-photo > img').attr('src') || ''
  if (photoLink) photoLink = 'https:' + photoLink
  const accommodation = new Accommodation(
    title,
    address,
    description,
    tds,
    url,
    photoLink,
    stats,
  )
  accommodation.link = url
  return accommodation
}
