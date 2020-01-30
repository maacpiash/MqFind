import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export const Paper = (props: any): any => {
  const classes = useStyles()
  return <div className={classes.paper}>{props.children}</div>
}

export const FormBody = (props: any): any => {
  const classes = useStyles()
  return <div className={classes.form}>{props.children}</div>
}

export const Delimeter = (props: any): any => {
  return <><br /><br /></>
}
