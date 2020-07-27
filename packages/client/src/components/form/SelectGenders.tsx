import * as React from 'react'
import { Dropdown, IDropdownOption } from '@fluentui/react/lib'

const genders = [
  { key: 'F', text: 'Female' },
  { key: 'M', text: 'Male' },
]

const SelectGenders: React.FunctionComponent = () => {
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([])

  const onChange = (
    _event: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption | undefined,
  ): void => {
    if (item) {
      setSelectedKeys(
        item.selected
          ? [...selectedKeys, item.key as string]
          : selectedKeys.filter((key) => key !== item.key),
      )
    }
  }

  return (
    <Dropdown
      placeholder="Multiple choice"
      label="Prefered Gender(s)"
      selectedKeys={selectedKeys}
      onChange={onChange}
      multiSelect
      options={genders}
      style={{ width: '300px' }}
    />
  )
}

export default SelectGenders
