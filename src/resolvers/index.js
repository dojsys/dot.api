
const { extractFragmentReplacements } = require('prisma-binding')
const { Query } = require('./Query')
const { Mutation } = require('./Mutation')
const { Subscription } = require('./Subscription')

const resolvers = {
  Query,
  Mutation,
  Subscription,
  Node: {
    __resolveType() {
      return null;
    }
  }
}

const fragmentReplacements = extractFragmentReplacements(resolvers)

module.exports = {
  resolvers, fragmentReplacements
}
