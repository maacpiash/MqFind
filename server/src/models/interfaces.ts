import { HousingOptions, CampusNames } from './constants'

export interface IBedroom {
  vacancyType: string
  weeklyRate: number
  bond: number
  availableFrom: Date
}

export interface ILeaseDetails {
  maxLease?: number
  minLease: number
  leaseType: string
}

export interface IResponse {
  numberOfOptions: number
  pageNumber: number
  links: string[]
}

export interface IQuery {
  housingOption: HousingOptions
  campusName: CampusNames
  maxRent: number
  suburb?: string
  postcode?: number
  bathroom?: number
  ensuite?: boolean
  leaseMin?: number
  leaseMax?: number
  distanceMax?: number
  vacancy?: number
  bedroom?: number
  heating?: boolean
  cooling?: boolean
  internet?: boolean
  cantSmoke?: boolean
  prefGender?: string[]
  wheelchairAccess?: boolean
}

export function queryBuilder(object: any): IQuery {
  const { housingOption, campusName, maxRent } = object
  return {
    housingOption,
    campusName,
    maxRent: Number(maxRent),
    suburb: object.suburb || undefined,
    postcode: Number(object.postcode) || undefined,
    bathroom: Number(object.bathroom) || undefined,
    ensuite: object.ensuite ? Boolean(object.ensuite) : undefined,
    leaseMin: Number(object.leaseMin) || undefined,
    leaseMax: Number(object.leaseMax) || undefined,
    distanceMax: Number(object.distanceMax) || undefined,
    vacancy: Number(object.vacancy) || undefined,
    bedroom: Number(object.bedroom) || undefined,
    heating: object.heating ? Boolean(object.heating) : undefined,
    cooling: object.cooling ? Boolean(object.cooling) : undefined,
    internet: object.internet ? Boolean(object.internet) : undefined,
    canSmoke: object.canSmoke ? Boolean(object.canSmoke) : undefined,
    prefGender: object.prefGender
      ? object.prefGender.toUpperCase().split('')
      : [],
    wheelchairAccess: object.wheelchairAccess
      ? Boolean(object.wheelchairAccess)
      : undefined,
  } as IQuery
}
