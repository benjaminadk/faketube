require('dotenv').config()
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { importSchema } = require('graphql-import')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const http = require('http')
const addUserIdToRequest = require('./middleware/addUserIdToRequest')
const addUserToRequest = require('./middleware/addUserToRequest')
const { prisma } = require('./generated')
const resolvers = require('./resolvers')
const { photoAuth, photoAuthCallback } = require('./router/photoAuth')
const lambda = require('./router/lambda')

const { NODE_ENV, FRONTEND_DEV, FRONTEND_PROD, PORT } = process.env

const app = express()
const path = '/graphql'

const cors = {
  origin: NODE_ENV === 'development' ? FRONTEND_DEV : FRONTEND_PROD,
  credentials: true
}

const server = new ApolloServer({
  typeDefs: importSchema('./src/schema.graphql'),
  resolvers,
  playground: {
    settings: {
      'editor.fontFamily': 'Fira Code',
      'editor.fontSize': 12,
      'request.credentials': 'include'
    }
  },
  context: ({ req, res }) => ({
    prisma,
    res,
    userId: req.userId,
    user: req.user
  })
})

app.use(cookieParser(), addUserIdToRequest, addUserToRequest)

app.get('/api/photoAuth', photoAuth)
app.get('/api/photoAuth/callback', photoAuthCallback)
app.post('/api/lambda', bodyParser.json(), lambda)

server.applyMiddleware({ app, path, server, cors })

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen(PORT, () => {
  console.log(`Server @ http://localhost:${PORT}${server.graphqlPath}`)
  console.log(`Subscriptions @ ws://localhost:${PORT}${server.subscriptionsPath}`)
})
