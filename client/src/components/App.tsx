import * as React from 'react'
import Form from './form'
import { AppState, FormState } from '../types'
import urlBuilder from '../urlBuilder'

export default class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props)
    this.state = {
      formFields: {
        housingType: 'rooms',
        campusName: 'macquarie-university',
        maxRent: 200,
      },
      showForm: true,
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
    this.setState({ formFields: state })
    const fields = this.state.formFields
    const newFields = this.refine(fields)
    const url = urlBuilder('https://localhost:4100', newFields)
    console.log(url)
  }

  render() {
    return (
      <Form
        initialState={this.state.formFields}
        setParams={this.setParams.bind(this)}
      />
    )
  }
}