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
  Checkbox,
  Dropdown,
  IDropdownOption,
  TextField,
  initializeIcons,
} from '@fluentui/react/lib'
import { FormProps, FormState } from '../types'

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

const updateState = <T extends string | number>(
  key: keyof FormState,
  value: T,
) => (prevState: FormState): FormState => ({
  ...prevState,
  [key]: numberKeys.includes(key)
    ? Number(value)
    : stringKeys.includes(key)
    ? value
    : Boolean(value),
})

const childStack: IStackTokens = {
  childrenGap: 10,
  maxWidth: 300,
}

const parentStack: IStackTokens = {
  childrenGap: 20,
  maxWidth: 1000,
}

export default class Form extends React.Component<FormProps, FormState> {
  constructor(props: any) {
    super(props)
    this.state = props.initialState
    initializeIcons()
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
    const { housingOption, campusName, maxRent } = this.state
    return (
      <form onSubmit={console.log}>
        <Stack horizontal tokens={parentStack}>
          <Stack tokens={childStack}>
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
              errorMessage={
                !maxRent ? 'Please provide a valid value' : undefined
              }
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
            <TextField
              id="bathroom"
              label="Bathroom"
              iconProps={{ iconName: 'NumberSymbol' }}
              onChange={this.handleChange.bind(this, 'bathroom')}
            />
          </Stack>
          <Stack tokens={childStack}>
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
              id="distanceMax"
              label="Maximum distance from campus"
              iconProps={{ iconName: 'MapDirections' }}
              onChange={this.handleChange.bind(this, 'distanceMax')}
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
            {/* <Dropdown
              selectedKey={selectedItem ? selectedItem.key : undefined}
              onChange={onChange}
              options={dropdownControlledExampleOptions}
              styles={dropdownStyles}
            /> */}
          </Stack>
          <Stack tokens={childStack}>
            <Checkbox
              label="Ensuite"
              onChange={this.handleChange.bind(this, 'ensuite')}
            />
            <Stack horizontal tokens={childStack}>
              <DefaultButton text="Reset" />
              <PrimaryButton
                text="Submit"
                disabled={!(housingOption && campusName && maxRent)}
                onClick={console.log}
              />
            </Stack>
          </Stack>
        </Stack>
      </form>
    )
  }
}
