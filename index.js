import express from 'express';
import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from './schema';
import resolvers from './resolvers';
import cors from 'cors';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
}

const server = new ApolloServer({ schema });

const startServer = async () => {
  await server.start();

  const app = express();

  app.use(cors(corsOptions));
  app.use(bodyParser.json());

  server.applyMiddleware({ app, path: '/graphql' });

  let port = process.env.PORT;
  if (port == null || port == "") {
    port = 8080;
  }
  app.listen(port, () => {
    console.log(`🚀 Server ready at https://test-task.herokuapp.com${server.graphqlPath}`);
  });
};

startServer();