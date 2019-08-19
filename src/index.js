const { GraphQLServer, PubSub } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const { resolvers, fragmentReplacements } = require('./resolvers')
const { prisma } = require('./prisma')

const pubsub = new PubSub()

const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
  context: req => ({
    ... {
        pubsub,
        prisma,
        req
    },
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'http://mis.divstuff.net:4477/divstuff/dev'
    })
  },fragmentReplacements)
})

const options = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 4000,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
}

server.start(options, ({ port, env }) =>
console.log(
  `Server started in ${env} mode, listening on port ${port} for incoming requests.`,
),
)

server.express.get(server.options.endpoint + 'user', (req, res, done) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    message: 'Message from graphql-yoga (Express API)',
    obj: 'You can use graphql-yoga as a simple REST API'
  })
})

