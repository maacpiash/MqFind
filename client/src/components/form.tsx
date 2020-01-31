import * as React from 'react'
import {
  Button,
  Checkbox,
  CssBaseline,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  FormLabel,
  TextField,
  Typography,
} from '@material-ui/core'
import { Delimeter } from './Atomics'
import { FormState, IMenuItem } from '../types'

const styles = {
  grid_container: {
    display: 'grid',
    'grid-template-columns': 'auto auto',
    padding: '10px',
  },
  grid_item: {
    padding: '10px',
    'font-size': '30px',
  },
}

const campuses: IMenuItem[] = [
  { value: 'macquarie-university', label: 'North Ryde Campus' },
  { value: 'macquarie-university-city', label: 'City Campus' },
]

const housingOptions: IMenuItem[] = [
  { value: 'properties', label: 'Properties' },
  { value: 'rooms', label: 'Rooms' },
]

type FormStateKey = keyof FormState

const numberKeys: FormStateKey[] = [
  'bathroom',
  'leaseMin',
  'leaseMax',
  'distanceMax',
  'vacancy',
  'bedroom',
]

const stringKeys: FormStateKey[] = ['housingOption', 'campusName']


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

type FormProps = {
  initialState: FormState
  setParams: (state: FormState) => void
}

export default class Form extends React.Component<FormProps, FormState> {
  constructor(props: any) {
    super(props)
    this.state = props.initialState
  }

  handleChange(key: FormStateKey, event: any): void {
    this.setState(updateState(key, event.target.value))
  }

  handleSubmit(event: any): void {
    this.props.setParams(this.state)
  }

  render() {
    const {
      housingOption,
      campusName,
      maxRent,
      bathroom,
      ensuite,
      leaseMin,
      leaseMax,
      distanceMax,
      vacancy,
      bedroom,
      heating,
      cooling,
      internet,
      cantSmoke,
      female,
      male,
      wheelchairAccess,
    } = this.state
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div>
          <div>
            <div style={styles.grid_container}>
              <div style={styles.grid_item}>
                <Typography component="h1" variant="h5">
                  Mandatory fields
                </Typography>
                <br />
                <FormControl style={{ minWidth: 300 }}>
                  <TextField
                    id="select-housing-type"
                    name="housingOption"
                    select
                    error={!housingOption}
                    variant="outlined"
                    label="Housing Type"
                    value={housingOption}
                    onChange={this.handleChange.bind(this, 'housingOption')}
                  >
                    {housingOptions.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
                <Delimeter />
                <FormControl style={{ minWidth: 300 }}>
                  <TextField
                    id="select-campus"
                    name="campusName"
                    select
                    error={!campusName}
                    fullWidth
                    className="row align-items-center"
                    variant="outlined"
                    label="Campus Name"
                    value={campusName}
                    onChange={this.handleChange.bind(this, 'campusName')}
                  >
                    {campuses.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
                <Delimeter />
                <FormControl style={{ minWidth: 300 }}>
                  <TextField
                    id="text-max-rent"
                    name="maxRent"
                    error={!maxRent}
                    variant="outlined"
                    className="row align-items-center"
                    label="Maximum weekly rent"
                    value={maxRent}
                    onChange={this.handleChange.bind(this, 'maxRent')}
                    placeholder="AUD"
                  />
                </FormControl>
                <Delimeter />
                <Typography component="h4" variant="h5">
                  Optional fields
                </Typography>
                <br />
                <FormControl style={{ minWidth: 300 }}>
                  <TextField
                    id="select-min-bathroom"
                    name="bathroom"
                    type="number"
                    variant="outlined"
                    label="Minimum bathroom(s)"
                    value={bathroom}
                    onChange={this.handleChange.bind(this, 'bathroom')}
                    helperText="Minimum number of bathrooms needed"
                  />
                </FormControl>
                <Delimeter />
                <FormControl style={{ minWidth: 300 }}>
                  <TextField
                    id="text-min-lease"
                    name="maxLease"
                    type="number"
                    variant="outlined"
                    className="row align-items-center"
                    label="Minimum Lease"
                    value={leaseMin}
                    onChange={this.handleChange.bind(this, 'leaseMin')}
                    helperText="Minimum number of months of lease"
                  />
                </FormControl>
                <Delimeter />
                <FormControl style={{ minWidth: 300 }}>
                  <TextField
                    id="text-max-lease"
                    name="maxLease"
                    type="number"
                    variant="outlined"
                    className="row align-items-center"
                    label="Maximum Lease"
                    value={leaseMax}
                    onChange={this.handleChange.bind(this, 'leaseMax')}
                    helperText="Maximum number of months for lease"
                  />
                </FormControl>
                <Delimeter />
                <FormControl style={{ minWidth: 300 }}>
                  <TextField
                    id="text-max-distance"
                    name="distanceMax"
                    type="number"
                    variant="outlined"
                    className="row align-items-center"
                    label="Maximum Distance"
                    value={distanceMax}
                    onChange={this.handleChange.bind(this, 'distanceMax')}
                    helperText="Maximum distance from campus (km)"
                  />
                </FormControl>
              </div>
              <div style={styles.grid_item}>
                <FormControl style={{ minWidth: 300 }}>
                  <TextField
                    id="text-vacancy"
                    name="vacancy"
                    type="number"
                    variant="outlined"
                    className="row align-items-center"
                    label="Vacancy"
                    value={vacancy}
                    onChange={this.handleChange.bind(this, 'vacancy')}
                    helperText="Minimum number of vacancy"
                  />
                </FormControl>
                <Delimeter />
                <FormControl style={{ minWidth: 300 }}>
                  <TextField
                    id="text-bedroom"
                    name="bedroom"
                    type="number"
                    variant="outlined"
                    className="row align-items-center"
                    label="Bedroom(s)"
                    value={bedroom}
                    onChange={this.handleChange.bind(this, 'bedroom')}
                    helperText="Minimum number of bedroom(s)"
                  />
                </FormControl>
                <Delimeter />
                <FormControl style={{ minWidth: 300 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={heating}
                        onChange={this.handleChange.bind(this, 'heating')}
                        value="heating"
                        color="primary"
                      />
                    }
                    label="Heating"
                  />
                </FormControl>
                <br />
                <FormControl style={{ minWidth: 300 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={cooling}
                        onChange={this.handleChange.bind(this, 'cooling')}
                        value="cooling"
                        color="primary"
                      />
                    }
                    label="Cooling"
                  />
                </FormControl>
                <br />
                <FormControl style={{ minWidth: 300 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={ensuite}
                        onChange={this.handleChange.bind(this, 'ensuite')}
                        value="ensuite"
                        color="primary"
                      />
                    }
                    label="Ensuite"
                  />
                </FormControl>
                <br />
                <FormControl style={{ minWidth: 300 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={internet}
                        onChange={this.handleChange.bind(this, 'internet')}
                        value="internet"
                        color="primary"
                      />
                    }
                    label="Internet"
                  />
                </FormControl>
                <br />
                <FormControl style={{ minWidth: 300 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={cantSmoke}
                        onChange={this.handleChange.bind(this, 'cantSmoke')}
                        value="ensuite"
                        color="primary"
                      />
                    }
                    label="No smoking"
                  />
                </FormControl>
                <Delimeter />
                <FormControl component="fieldset">
                  <FormLabel component="legend">Gender of tenants</FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={female}
                          onChange={this.handleChange.bind(this, 'female')}
                          value="female"
                        />
                      }
                      label="Female"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={male}
                          onChange={this.handleChange.bind(this, 'male')}
                          value="male"
                        />
                      }
                      label="Male"
                    />
                  </FormGroup>
                </FormControl>
                <Delimeter />
                <FormControl style={{ minWidth: 300 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={wheelchairAccess}
                        onChange={this.handleChange.bind(
                          this,
                          'wheelchairAccess',
                        )}
                        value="wheelchairAccess"
                        color="primary"
                      />
                    }
                    label="Wheelchair Access"
                  />
                </FormControl>
                <br />
                <div style={{ margin: '5 px' }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    className="row align-items-center"
                    onClick={this.handleSubmit.bind(this)}
                  >
                    View Housing Options
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    )
  }
}
