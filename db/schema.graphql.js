const { gql } = require('apollo-server');

const typeDefs = gql`
  type Medic {
    id: ID
    sufijo: String
    nombre: String
    apPaterno: String
    apMaterno: String
    especialidad: String
    email: String
    password: String
    numTel: String
    createdAt: String
  }

  type Location {
    id: ID
    medicId: ID
    street: String
    number: Int
    city: String
    state: String
    postalCode: Int
    country: String
    createdAt: String
  }

  type Token {
    token: String
  }

  input MedicInput {
    sufijo: String
    nombre: String!
    apPaterno: String!
    apMaterno: String
    especialidad: String
    email: String!
    password: String!
    numTel: String
  }

  input LocationInput {
    medicId: ID!
    street: String!
    number: Int!
    city: String!
    state: String!
    postalCode: Int!
    country: String!
  }

  input AuthInput {
    email: String!
    password: String!
  }

  type Query {
    getMedic(token: String!): Medic
    verifyToken(token: String!): Boolean
    getLocation(id: ID!): Location
  }

  type Mutation {
    newMedic(input: MedicInput): Medic
    authMedic(input: AuthInput): Token
    medicLocation(input: LocationInput): String
  }
`;

module.exports = typeDefs;