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
  bathroom?: number
  leaseMin?: number
  leaseMax?: number
  distanceMax?: number
  vacancy?: number
  bedroom?: number
  heating?: boolean
  cooling?: boolean
  internet?: boolean
  canSmoke?: boolean
  prefGender?: string[]
  wheelchairAccess?: boolean
}

export function queryBuilder(object: any): IQuery {
  const { housingOption, campusName, maxRent } = object
  return {
    housingOption,
    campusName,
    maxRent: Number(maxRent) || 0,
    bathroom: Number(object.bathroom) || 0,
    leaseMin: Number(object.leaseMin) || 0,
    leaseMax: Number(object.leaseMax) || 0,
    distanceMax: Number(object.distanceMax) || 0,
    vacancy: Number(object.vacancy) || 0,
    bedroom: Number(object.bedroom) || 0,
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
