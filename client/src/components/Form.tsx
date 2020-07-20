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
import { withFormik } from 'formik'
import {
  DefaultButton,
  IDropdownOption,
  IStackTokens,
  Stack,
  PrimaryButton,
  /*Checkbox as Cb,*/ Dropdown,
  initializeIcons,
  TextField,
} from '@fluentui/react/lib'
import { FormState } from '../types'

const campuses: IDropdownOption[] = [
  { key: 'macquarie-university', text: 'North Ryde Campus' },
  { key: 'macquarie-university-city', text: 'City Campus' },
]

const housingOptions: IDropdownOption[] = [
  { key: 'properties', text: 'Properties' },
  { key: 'rooms', text: 'Rooms' },
]

/*
type FormStateKey = keyof FormState

const numberKeys: FormStateKey[] = [
  'maxRent',
  'bathroom',
  'leaseMin',
  'leaseMax',
  'distanceMax',
  'vacancy',
  'bedroom',
]

const stringKeys: FormStateKey[] = ['housingOption', 'campusName']
*/
type FormProps = {
  initialState: FormState
  setParams: (state: FormState) => void
  fetchData: () => void
}

class Form extends React.Component<FormProps, FormState> {
  constructor(props: any) {
    super(props)
    this.state = props.initialState
  }

  onSubmit() {}

  clearForm() {}

  render() {
    const {
      // initialState,
      // touched,
      // dirty,
      // errors,
      handleChange,
      // handleBlur,
      handleSubmit,
      handleReset,
      setFieldValue,
      // setFieldTouched,
      // isSubmitting,
    } = this.props

    const stackTokens: IStackTokens = {
      childrenGap: 10,
      maxWidth: 250,
    }
    initializeIcons()

    return (
      <form onSubmit={handleSubmit}>
        <Stack tokens={stackTokens}>
          <Dropdown
            options={campuses}
            label="Name of campus"
            placeholder="Default: North Ryde Campus"
            onChange={(e, v) =>
              setFieldValue('campusName', v?.key ?? 'North Ryde Campus')
            }
          />
          <Dropdown
            options={housingOptions}
            label="Housing option"
            placeholder="Default: Rooms"
            onChange={(e, v) =>
              setFieldValue('housingOption', v?.key ?? 'North Ryde Campus')
            }
          />
          <TextField
            id="maxRent"
            label="Maximum weekly rent"
            iconProps={{ iconName: 'Money' }}
            onChange={handleChange}
          />
          <Stack horizontal tokens={stackTokens}>
            <DefaultButton
              text="Clear"
              onClick={handleReset}
              disabled={this.state.cleared}
              checked={true}
            />
            <PrimaryButton
              text="Search"
              type="submit"
              disabled={false}
              checked={true}
            />
          </Stack>
        </Stack>
      </form>
    )
  }
}

export default withFormik({
  mapPropsToValues: (props: any) => ({
    housingOption: 'rooms',
    campusName: 'macquarie-university',
    maxRent: 200,
  }),
  handleSubmit: (values: any, { setSubmitting }: any) => {
    const payload = values
    console.log(payload)
    // setTimeout(() => {
    //   alert(JSON.stringify(payload, null, 2));
    //   setSubmitting(false);
    // }, 1000);
  },
  displayName: 'MyForm',
})(Form)
