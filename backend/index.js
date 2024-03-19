const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors')
const { makeExecutableSchema } = require('@graphql-tools/schema');
const resolvers = require('./resolvers');

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
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();

app.use(cors())
app.use(
  '/graphql',
  graphqlHTTP({
    schema, 
    graphiql: process.env.NODE_ENV !== 'production', // Enable the GraphiQL interface in non-production environments
  })
);

// Define the port and start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
});