import { Server, Request } from '@hapi/hapi'
import querySchema from './validation'
import GetDetails from './services'
import { queryBuilder } from './models/interfaces'

const init = async (): Promise<void> => {
  const server = new Server({
    port: process.env.LISTEN_PORT || 4100,
    host: process.env.HOST || 'localhost',
    routes: { cors: { origin: ['*'] } },
  })

  server.route({
    method: 'GET',
    path: '/',
    options: { validate: { query: querySchema } },
    handler: (request: Request) => {
      console.log(`REST ${request.url} ${new Date().toLocaleString()}`)
      return GetDetails(queryBuilder(request.query))
    },
  })

  await server.start()
  console.log(
    `Server started on ${server.info.uri} at ${new Date().toLocaleString()}`,
  )
}

process.on('unhandledRejection', (err: any) => {
  console.log(err)
  process.exit(1)
})

init()
