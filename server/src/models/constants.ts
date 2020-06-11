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
export enum CampusNames {
  NorthRyde = 'macquarie-university',
  City = 'macquarie-university-city',
}

export enum HousingOptions {
  Properties = 'properties',
  Rooms = 'rooms',
}

export enum OrderOptions {
  cheapest = 'price',
  closest = 'distance',
  newest = 'recency',
}

export const BASE_URL = 'https://find.accommodation.mq.edu.au'

export const scrapedKeys: string[] = [
  'Lease',
  'Bedrooms available',
  'Occupants',
  'Bathrooms',
  'Type of Lease',
  'Bedroom Furnishing',
  'House Furnishing',
  'Heating/Cooling',
  'Internet Available',
  'Safety',
  'Included Bills',
  'Utilities',
  'Parking',
  'Smoking',
  'Common Areas Accessible',
  'Animals / Pets',
  'Preferred Gender',
  'Short Stay Option',
  'Wheelchair accessible?',
]

export const delimeter = '\n\t\t\t\t\t\t'

export const WTF = '(No data found)'

export const OptionsPerPage = 12
