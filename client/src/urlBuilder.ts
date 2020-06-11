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
export default function urlBuilder(
  baseUrl: string,
  params: { [key: string]: string | string[] | number | boolean | undefined },
): string {
  const query: string[] = []
  for (const k in params) {
    if (params[k]) {
      if (k !== 'prefGender')
        query.push(`${k}=${params[k]}`)
      else {
        const arr = params[k] as string[]
        if (arr.length) query.push(`${k}=${params[k]}`)
      }
    }
  }
  return baseUrl + '?' + query.join('&')
}
