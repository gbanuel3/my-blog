const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const resolvers = require('./resolvers')

const typeDefs = `
  type Query {
    getUser(id: Int!): User
    getRecentPosts(user_id: Int!): [Post]
  }

  type User {
    id: Int
    name: String
    email: String
  }

  type Post {
    id: Int
    title: String
    content: String
    author: User
    created_at: String
    updated_at: String
  }
`

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const app = express()

const origin =
  process.env.NODE_ENV === 'production'
    ? 'https://gil.technology'
    : 'http://localhost:3000'
const corsOptions = {
  origin: origin, // Ensure this matches your frontend's origin
  methods: ['GET', 'POST', 'OPTIONS'], // Explicitly include OPTIONS
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204, // Some browsers (like IE11) use 200
}

app.use(cors(corsOptions))
app.options('*', cors(corsOptions)) // Apply CORS for all OPTIONS requests
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV !== 'production',
  }),
)

// Define the port and start the server
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`)
})
