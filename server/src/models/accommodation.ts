import { delimeter, scrapedKeys, WTF } from './constants'
import { IDictionary } from './types'
import { IBedroom, ILeaseDetails } from './interfaces'

export class Accommodation {
  title: string
  description: string
  photoLink: string
  vacancy: number
  leaseDetails: ILeaseDetails
  bedroomNumber: number
  bedrooms: IBedroom[]
  heatingCooling: string[]
  wheelchairAccess: boolean
  bathroomNumber: number
  bedroomFurnishing: string
  houseFurnishing: string
  hasInternet: boolean
  cantSmoke: boolean
  safety: string[]
  bills: string
  utilities: string[]
  noPets: boolean
  prefGender: string[]
  shortStay: boolean
  commonAreasAccess: string[]
  link: string

  constructor(
    title: string,
    values: string[],
    link: string,
    photoLink: string,
  ) {
    this.title = title
    this.description = ''
    this.link = link
    this.photoLink = photoLink
    const dict: IDictionary<string[]> = {}
    let k = 0
    for (let i = 0; i < values.length; i++) {
      if (values[i] === scrapedKeys[k]) k++
      else {
        if (!dict[scrapedKeys[k - 1]]) dict[scrapedKeys[k - 1]] = []
        dict[scrapedKeys[k - 1]].push(values[i])
      }
    }

    // Now, let's remove the unnecessary text from the end of the last value
    dict['Short Stay Option'] = [dict['Short Stay Option']?.[0] ?? '']
    dict['Wheelchair accessible?'] = [dict['Wheelchair accessible?']?.[0] ?? '']

    // Getting rid of all empty elements
    scrapedKeys.forEach(k => (dict[k] = dict[k].filter(Boolean)))

    /*** *** *** vacancy  *** *** ***/
    const occupants = dict['Occupants']?.[0] ?? ''
    const arr = occupants.split(', ')
    this.vacancy = Number(arr[arr.length - 1].split(' ')[0])

    /*** *** *** lease details  *** *** ***/
    const leaseStr = dict['Lease'][0] ?? ''
    let maxLease: number | undefined, minLease: number
    if (leaseStr.includes('-')) {
      // 'x-y months'
      const range = leaseStr.split(' ') // ['x-y',  'months']
      const numbers = range[0].split('-') // ['x', 'y']
      minLease = Number(numbers[0]) ?? 0
      maxLease = Number(numbers[1]) ?? 0
    } else {
      // 'At least z months'
      minLease = Number(leaseStr.split(' ')[2]) ?? 0
    }
    const leaseType = dict['Type of Lease']?.[0] ?? ''
    this.leaseDetails = { minLease, maxLease, leaseType } as ILeaseDetails

    /*** *** *** bedrooms  *** *** ***/
    this.bedrooms = []
    const bedroomsArray = dict['Bedrooms available'] ?? []
    this.bedroomNumber = bedroomsArray.length ?? 0
    const bedrooms = bedroomsArray.map(bedroom => bedroom.split(delimeter))
    if (this.bedroomNumber > 1) bedrooms.forEach(bedroom => bedroom.shift())

    for (const bedroom of bedrooms) {
      const firstLine = bedroom[0].split(' ') // ['Single', '-', '$230', '/', 'week']
      const vacancyType = firstLine[0]
      const weeklyRate = Number(firstLine[2].substr(1))
      console.log('BOND', Number(bedroom[1].split('$')))
      const bond = 0 // Number(bedroom[1].split('$')[1] ?? '0')
      const availableFrom = new Date(bedroom[2].substr(10))
      this.bedrooms.push({
        vacancyType,
        weeklyRate,
        bond,
        availableFrom,
      } as IBedroom)
    }

    /*** *** *** atomic values  *** *** ***/
    this.bathroomNumber = Number(dict['Bathrooms']?.[0] ?? '0')
    this.bedroomFurnishing = dict['Bedroom Furnishing']?.[0] ?? WTF
    this.houseFurnishing = dict['House Furnishing']?.[0] ?? WTF
    this.hasInternet = dict['Internet Available'][0] === 'Yes'
    this.heatingCooling = dict['Heating/Cooling'][0]?.split(', ') ?? []
    this.wheelchairAccess = dict['Wheelchair accessible?'][0] === 'Yes'
    this.cantSmoke = dict['Smoking'][0] === 'Not permitted'
    this.safety = dict['Safety'][0]?.split(', ') ?? []
    this.bills = dict['Bills'][0] ?? WTF
    this.utilities = dict['Utilities'][0].split(', ')
    this.noPets = dict['Animals / Pets'][0] === 'Not Allowed'
    const gender = dict['Preferred Gender'][0]
    switch (gender) {
      case 'Male or Female':
        this.prefGender = ['F', 'M']
        break
      case 'Female':
        this.prefGender = ['F']
      default:
        this.prefGender = []
        break
    }
    this.shortStay = dict['Short Stay Option'][0] !== 'Short Stay Not Available'
    this.commonAreasAccess = dict['Common Areas Accessible'][0].split(', ')
  }
}
