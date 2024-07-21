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

const corsOptions ={
  origin:'*', 
  credentials:true,
  optionSuccessStatus:200,
}


const server = new ApolloServer({ schema });

const app = express();

app.use(cors(corsOptions)) 

app.use(bodyParser.json());
console.log('path',server.graphqlPath);
// server.start().then(() => {
//   server.applyMiddleware({ app, path: '/graphql' });

//   app.listen(8080, () => {
//     console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`);
//   });
// }).catch(error => {
//   console.error('Error starting server:', error);
// });;

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port, () => {
  console.log(`🚀 Server ready at https://test-task.herokuapp.com${server.graphqlPath}`);
});