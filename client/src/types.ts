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
  cleared?: boolean
}

export type FormProps = {
  initialState: FormState
  touched: boolean
  dirty: boolean
  errors: any
  handleChange: any
  handleBlur: any
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  handleReset: any
  setFieldValue: any
  setFieldTouched: any
  isSubmitting: any
}

export type AppState = {
  formFields: FormState
  apiUrl: string
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
