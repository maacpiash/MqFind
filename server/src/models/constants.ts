export enum CampusNames {
  NorthRyde = 'macquarie-university',
  City = 'macquarie-university-city',
}

export enum HousingOptions {
  Properties = 'properties',
  Rooms = 'rooms',
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
