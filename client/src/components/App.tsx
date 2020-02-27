import * as React from 'react'
import Form from './Form'
import { AppState, FormState } from '../types'
import urlBuilder from '../urlBuilder'

export default class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props)
    const formFields: any = {
      housingOption: 'rooms',
      campusName: 'macquarie-university',
      maxRent: 200,
    }
    this.state = {
      formFields,
      apiUrl: urlBuilder('http://localhost:4100/', formFields),
      showForm: true,
      options: []
    }
  }

  refine(optionalFields: FormState): any {
    const { female, male } = optionalFields
    const prefGender: string[] = []
    if (female) prefGender.push('F')
    if (male) prefGender.push('M')
    const newObj: any = { ...optionalFields, prefGender }
    delete newObj.female
    delete newObj.male
    return newObj
  }

  setParams(state: FormState): void {
    this.setState({ formFields: state }, () => {
      const fields = this.state.formFields
      const newFields = this.refine(fields)
      const apiUrl = urlBuilder('http://localhost:4100/', newFields)
      this.setState({ apiUrl })
    })
  }

  fetchData(): void {
    const { apiUrl } = this.state
    fetch(apiUrl).then(response => response.json()).then(console.log)
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