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
import { Server, Request /*, ServerRegisterPluginObject*/ } from '@hapi/hapi'
// import * as Inert from '@hapi/inert'
// import * as Vision from '@hapi/vision'
// import HapiSwagger from 'hapi-swagger'
// import { ApolloServer } from '@apollo/server'
// import { readFileSync } from 'fs'
import querySchema from './validation'
import GetDetails from './services'
import { queryBuilder } from './models/interfaces'

const init = async (): Promise<void> => {
  const server = new Server({
    port: process.env.LISTEN_PORT || 4100,
    host: process.env.HOST || 'localhost',
    routes: { cors: { origin: ['*'] } },
  })

  // const swaggerOptions: HapiSwagger.RegisterOptions = {
  //   info: {
  //     title: 'Test API Documentation',
  //   },
  // }

  // const plugins: Array<ServerRegisterPluginObject<any>> = [
  //   {
  //     plugin: Inert,
  //   },
  //   {
  //     plugin: Vision,
  //   },
  //   {
  //     plugin: HapiSwagger,
  //     options: swaggerOptions,
  //   },
  // ]

  // await server.register(plugins)

  server.route({
    method: 'GET',
    path: '/',
    options: { validate: { query: querySchema } },
    handler: (request: Request) => {
      console.log(`REST ${request.url} ${new Date().toLocaleString()}`)
      return GetDetails(queryBuilder(request.query))
    },
  })

  // const gqlServer = new ApolloServer({
  //   typeDefs: readFileSync('./schema.graphql').toString('utf-8'),
  //   resolvers: {
  //     Query: {
  //       getAccommodation: (query: object) => GetDetails(queryBuilder(query)),
  //     },
  //   },
  // })

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
