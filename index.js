const { ApolloServer } = require('apollo-server');
require('dotenv').config();

const conectarDB = require('./config/db');
const resolvers = require('./db/resolvers');
const typeDefs = require('./db/schema.graphql');

// MongoDB

conectarDB();

// Server
const server = new ApolloServer({
  typeDefs,
  resolvers
});

// Start Server

server.listen().then( ({ url }) =>{
  console.log(`Servidor listo en la URL ${url}`);
}).catch( error => console.log(error));

