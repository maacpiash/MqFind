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
import { Dropdown, IDropdownOption } from '@fluentui/react/lib'
import { FormState } from '../../types'

const extras = [
  { key: 'ensuite', text: 'Ensuite' },
  { key: 'heating', text: 'Heating' },
  { key: 'cooling', text: 'Cooling' },
  { key: 'internet', text: 'Internet' },
  { key: 'cantSmoke', text: 'Allow smoking' },
  { key: 'wheelchairAccess', text: 'Wheelchair access' },
]

type SelectProps = { setSelectedExtras: (values: keyof FormState) => any }
type SelectState = { selectedExtras: string[] }

class SelectExtras extends React.Component<SelectProps, SelectState> {
  constructor(props: any) {
    super(props)
    this.state = { selectedExtras: [] }
  }

  onChange(
    _event: React.FormEvent<HTMLDivElement>,
    dropdown?: IDropdownOption,
  ) {
    if (dropdown) {
      const selectedValues = dropdown.selected
        ? [...this.state.selectedExtras, dropdown.key as string]
        : this.state.selectedExtras.filter((key) => key !== dropdown.key)
      this.setState({ selectedExtras: selectedValues })
      // this.props.setSelectedExtras(selectedValues)
    }
  }

  render() {
    const { selectedExtras: selectedGenders } = this.state
    return (
      <Dropdown
        placeholder="Multiple choice"
        label="Extras"
        selectedKeys={selectedGenders}
        onChange={this.onChange.bind(this)}
        multiSelect
        options={extras}
        style={{ maxWidth: '300px' }}
      />
    )
  }
}

export default SelectExtras
