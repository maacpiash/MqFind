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
import * as React from 'react'
import { HousingOptions, CampusNames } from '@mqfind/common'
import Form from './form'
import { AppState, FormState } from '../types'
import urlBuilder from '../urlBuilder'

export default class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props)
    const formFields: FormState = {
      housingOption: HousingOptions.Rooms,
      campusName: CampusNames.NorthRyde,
      maxRent: 200,
    }
    this.state = {
      formFields,
      apiUrl: urlBuilder('http://localhost:4100/', formFields),
      showForm: true,
      options: [],
    }
  }

  setParams(state: FormState): void {
    this.setState({ formFields: state }, () => {
      const fields = this.state.formFields
      const apiUrl = urlBuilder('http://localhost:4100/', fields)
      this.setState({ apiUrl })
    })
  }

  fetchData(): void {
    const { apiUrl } = this.state
    fetch(apiUrl)
      .then((response) => response.json())
      .then(console.log)
  }

  render() {
    return (
      <Form
        initialState={this.state.formFields}
        setParams={this.setParams.bind(this)}
        fetchData={this.fetchData.bind(this)}
      />
    )
  }
}
