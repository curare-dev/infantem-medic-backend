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

  input AuthInput {
    email: String!
    password: String!
  }

  type Query {
    getMedic(token: String!): Medic
  }

  type Mutation {
    newMedic(input: MedicInput): Medic
    authMedic(input: AuthInput): Token
  }
`;

module.exports = typeDefs;