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

const genders = [
  { key: 'F', text: 'Female' },
  { key: 'M', text: 'Male' },
]

type SelectProps = { setSelectedGenders: (values: string[]) => any }
type SelectState = { selectedGenders: string[] }

class SelectGenders extends React.Component<SelectProps, SelectState> {
  constructor(props: any) {
    super(props)
    this.state = { selectedGenders: [] }
  }

  onChange(
    _event: React.FormEvent<HTMLDivElement>,
    dropdown?: IDropdownOption,
  ) {
    if (dropdown) {
      const selectedGenders = dropdown.selected
        ? [...this.state.selectedGenders, dropdown.key as string]
        : this.state.selectedGenders.filter((key) => key !== dropdown.key)
      this.setState({ selectedGenders })
      this.props.setSelectedGenders(selectedGenders)
    }
  }

  render() {
    const { selectedGenders } = this.state
    return (
      <Dropdown
        placeholder="Multiple choice"
        label="Prefered Gender(s)"
        selectedKeys={selectedGenders}
        onChange={this.onChange.bind(this)}
        multiSelect
        options={genders}
        style={{ maxWidth: '300px' }}
      />
    )
  }
}

export default SelectGenders
