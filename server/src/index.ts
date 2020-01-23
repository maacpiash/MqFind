import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import appErrorHandler from './app-error-handler'
import GetDetails from './services'
import { queryBuilder } from './models/interfaces'

const LISTEN_PORT = process.env.LISTEN_PORT || 4100

const app = express()
  .use(express.json())
  .use(cors())

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  console.log(new Date().toLocaleString(), req.url)
  const { housingOption, campusName, maxRent } = req.query
  if (!housingOption || !campusName || !maxRent) {
    res.statusCode = 400
    res.send(`housingOption, campusName, maxRent are required`)
  }
  const query = queryBuilder(req.query)
  GetDetails(query)
    .then(str => res.status(200).json(str))
    .catch(console.error)
  next()
})

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  console.log(new Date().toLocaleString(), res.statusCode)
  next()
})

app.use(appErrorHandler)

app.listen(LISTEN_PORT, () =>
  console.log(`Server started on port ${LISTEN_PORT}...`),
)
