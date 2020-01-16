export interface IAccommodation {
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
}

export interface ILeaseDetails {
  maxLease: number | undefined
  minLease: number
  leaseType: string
}

export interface IBedroom {
  vacancyType: string
  weeklyRate: number
  bond: number
  availableFrom: Date
}