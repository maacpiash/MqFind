import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import GetDetails from './services'
import { queryBuilder } from './models/interfaces'
import { errorHandler, logger } from './middleware'

const LISTEN_PORT = process.env.LISTEN_PORT || 4100

const app = express()
  .use(express.json())
  .use(cors())

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  const { housingOption, campusName, maxRent } = req.query
  if (!housingOption || !campusName || !maxRent) {
    res.statusCode = 400
    res.send(`housingOption, campusName, maxRent are required`)
  }
  const query = queryBuilder(req.query)
  GetDetails(query)
    .then(str => res.send(str))
    .then(next)
})

app.use(logger)
app.use(errorHandler)

app.listen(LISTEN_PORT, () =>
  console.log(`Server started on port ${LISTEN_PORT}...`),
)
