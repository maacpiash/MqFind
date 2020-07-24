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
import { object, string, number, bool } from '@hapi/joi'
import { CampusNames, HousingOptions } from './models/constants'

const querySchema = object({
  housingOption: string()
    .valid(HousingOptions.Properties, HousingOptions.Rooms)
    .required(),
  campusName: string()
    .valid(CampusNames.City, CampusNames.NorthRyde)
    .required(),
  maxRent: number().integer().min(0).default(200).required(),
  suburb: string(),
  postcode: number().min(1001).max(3707), // https://postcodes-australia.com/state-postcodes/nsw
  bathroom: number().min(1),
  ensuite: bool(),
  leaseMin: number().min(1),
  leaseMax: number().min(1),
  distanceMax: number().min(0.1),
  vacancy: number().min(1),
  bedroom: number().min(1),
  heating: bool(),
  cooling: bool(),
  internet: bool(),
  canSmoke: bool(),
  prefGender: string().valid('F', 'F,M', 'M'),
  wheelchairAccess: bool(),
  keywords: string(),
})

export default querySchema
