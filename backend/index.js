require('dotenv').config()

const next = require('next');
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const resolvers = require('./resolvers')

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
app.prepare().then(() => {
  const server = express();
  const typeDefs = require('./typeDef')

  server.use(cors());
  server.use(
    '/graphql',
    graphqlHTTP({
      schema: makeExecutableSchema({ typeDefs, resolvers }),
      graphiql: dev,
    }),
  );

  // Next.js page serving
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 4000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});