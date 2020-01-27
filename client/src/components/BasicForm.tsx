import React from 'react'
import { Button, FormControl, MenuItem, TextField } from '@material-ui/core'
import { IMenuItem } from '../interfaces'

const campuses: IMenuItem[] = [
  { value: 'macquarie-university', label: 'North Ryde Campus' },
  { value: 'macquarie-university-city', label: 'City Campus' },
]

const housingTypes: IMenuItem[] = [
  { value: 'properties', label: 'Properties' },
  { value: 'rooms', label: 'Rooms' },
]

type BasicFormState = {
  housingType: string
  campusName: string
  maxRent: number
}

type BasicFormStateKey = keyof BasicFormState

const updateState =
  <T extends string | number>(key: keyof BasicFormState, value: T) => (
    prevState: BasicFormState
  ): BasicFormState => ({
    ...prevState,
    [key]: value
  })

export default class BasicForm extends React.Component<{}, BasicFormState> {
  constructor(props: any) {
    super(props)
    this.state = {
      housingType: 'rooms',
      campusName: 'macquarie-university',
      maxRent: 200
    }
  }

  handleChange(key: BasicFormStateKey, event: any) {
    this.setState(updateState(key, event.target.value))
  }

  handleSubmit(event: any) {
    console.log(event)
  }

  render() {
    const { housingType, campusName, maxRent } = this.state
    return (
      <form>
        <FormControl>
          <TextField
            id="select-housing-type"
            select
            variant="outlined"
            label="Housing Type"
            value={housingType}
            onChange={this.handleChange.bind(this, 'housingType')}
            helperText="The type of housing you're looking for"
          >
            {housingTypes.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
        <br /><br />
        <FormControl>
          <TextField
            id="select-campus"
            select
            variant="outlined"
            label="Campus Name"
            value={campusName}
            onChange={this.handleChange.bind(this, 'campusName')}
            helperText="The campus you want to stay close to"
          >
            {campuses.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
        <br /><br />
        <FormControl>
          <TextField
            id="text-max-rent"
            variant="outlined"
            label="Maximum rent"
            value={maxRent}
            onChange={this.handleChange.bind(this, 'maxRent')}
            helperText="The maximum weekly rent (AUD)"
          />
        </FormControl>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleSumit.bind(this)}
        >
          Get Houses
        </Button>
      </form>
    )
  }
}
