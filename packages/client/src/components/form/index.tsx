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
import {
  Stack,
  IStackTokens,
  DefaultButton,
  PrimaryButton,
  Dropdown,
  IDropdownOption,
  TextField,
  initializeIcons,
} from '@fluentui/react/lib'
import { FormProps, FormState } from '../../types'
import SelectGenders from './SelectGenders'
import SelectExtras from './SelectExtras'

const campuses: IDropdownOption[] = [
  { key: 'macquarie-university', text: 'North Ryde Campus' },
  { key: 'macquarie-university-city', text: 'City Campus' },
]

const housingOptions: IDropdownOption[] = [
  { key: 'properties', text: 'Properties' },
  { key: 'rooms', text: 'Rooms' },
]

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

const stringKeys: FormStateKey[] = [
  'housingOption',
  'campusName',
  'suburb',
  'postcode',
]

const updateState = <T extends string | number | string[]>(
  key: keyof FormState,
  value: T,
) => (prevState: FormState): FormState => ({
  ...prevState,
  [key]: numberKeys.includes(key)
    ? key === 'distanceMax' && Number(value) < 0.1
      ? undefined
      : Number(value)
    : stringKeys.includes(key)
    ? value
    : key === 'prefGender'
    ? value
    : Boolean(value),
})

const horiStackTokens: IStackTokens = {
  childrenGap: 15,
  maxWidth: 300,
}

const vertStackTokens: IStackTokens = {
  childrenGap: 10,
  maxWidth: 300,
}

export default class Form extends React.Component<FormProps, FormState> {
  constructor(props: any) {
    super(props)
    this.state = props.initialState
    initializeIcons()
  }

  handleReset(e: any) {
    e.preventDefault()
    // e.target.reset()
  }

  handleChange(key: FormStateKey, event: any): void {
    this.setState(updateState(key, event.target.value), () =>
      this.props.setParams(this.state),
    )
  }

  handleSubmit(): void {
    this.props.fetchData()
  }

  render() {
    const { housingOption, campusName, maxRent, distanceMax } = this.state
    return (
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault()
          console.log(e)
        }}
        style={{
          margin: 'auto',
          width: '50%',
          padding: '10px',
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        <Stack tokens={vertStackTokens} style={{ margin: '10px' }}>
          <Dropdown
            options={housingOptions}
            label="Find"
            defaultSelectedKey="rooms"
            onChange={this.handleChange.bind(this, 'housingOption')}
          />
          <Dropdown
            options={campuses}
            label="Near"
            defaultSelectedKey="macquarie-university"
            onChange={this.handleChange.bind(this, 'campusName')}
          />
          <TextField
            id="maxRent"
            label="For up to"
            onChange={this.handleChange.bind(this, 'maxRent')}
            errorMessage={!maxRent ? 'Please provide a valid value' : undefined}
            defaultValue="200"
            prefix="$"
            suffix="/ week"
          />
          <TextField
            id="suburb"
            label="Suburb (separate with commas)"
            iconProps={{ iconName: 'MapPin' }}
            onChange={this.handleChange.bind(this, 'suburb')}
          />
          <TextField
            id="postcode"
            label="Postcode"
            iconProps={{ iconName: 'Location' }}
            onChange={this.handleChange.bind(this, 'postcode')}
          />
        </Stack>
        <Stack tokens={vertStackTokens} style={{ margin: '10px' }}>
          <TextField
            id="distanceMax"
            label="Maximum distance from campus"
            suffix="km"
            errorMessage={
              distanceMax && distanceMax < 0.1
                ? 'Value lower than 0.1 will be ignored'
                : undefined
            }
            onChange={this.handleChange.bind(this, 'distanceMax')}
          />
          <TextField
            id="leaseMin"
            label="Minimum lease"
            suffix="months"
            onChange={this.handleChange.bind(this, 'leaseMin')}
          />
          <TextField
            id="leaseMax"
            label="Maximum lease"
            suffix="months"
            onChange={this.handleChange.bind(this, 'leaseMax')}
          />
          <TextField
            id="vacancy"
            label="Vacancy"
            iconProps={{ iconName: 'UserOptional' }}
            onChange={this.handleChange.bind(this, 'vacancy')}
          />
          <TextField
            id="bedroom"
            label="Number of room(s)"
            iconProps={{ iconName: 'Room' }}
            onChange={this.handleChange.bind(this, 'bedroom')}
          />
        </Stack>
        <Stack tokens={vertStackTokens} style={{ margin: '10px' }}>
          <TextField
            id="bathroom"
            label="Bathroom"
            iconProps={{ iconName: 'NumberSymbol' }}
            onChange={this.handleChange.bind(this, 'bathroom')}
          />
          <SelectGenders
            setSelectedGenders={(prefGender) => this.setState({ prefGender })}
          />
          <SelectExtras setSelectedExtras={console.log} />
          <Stack horizontal tokens={horiStackTokens}>
            <DefaultButton text="Reset" onClick={this.handleReset} />
            <PrimaryButton
              text="Submit"
              disabled={!(housingOption && campusName && maxRent)}
              onClick={() => console.log(JSON.stringify(this.state, null, 2))}
            />
          </Stack>
        </Stack>
      </form>
    )
  }
}
