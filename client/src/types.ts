export type FormState = {
  housingOption: string
  campusName: string
  maxRent: number
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
  female?: boolean
  male?: boolean
  wheelchairAccess?: boolean
}

export type AppState = {
  formFields: FormState
  showForm: boolean
  options: any[]
}

export interface IMenuItem {
  value: string
  label: string
}

export type ListProps = {
  options: any[]
  housingOption: string
}
