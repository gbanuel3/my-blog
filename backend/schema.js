const { buildSchema } = require('graphql')

const schema = buildSchema(`
  type Query {
    getUser(id: Int!): User
  }

  type User {
    id: Int
    name: String
    email: String
  }

`)

module.exports = schema
