const Medic = require("../models/Medics");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');

const createToken = ( medic, secret, expiresIn ) => {
  const { id, email, nombre, apellido } = medic;
  return jwt.sign( { id, email, nombre, apellido }, secret, { expiresIn } );
}

// Resolvers
const resolvers = {
  Query: {
    getMedic: async ( _, { token }) => {
      const medicID = await jwt.verify( token, process.env.SECRET )
      return medicID;
    }
  },
  Mutation: {
    newMedic: async ( _, { input } ) => {
      const { email, password } = input;
      const isMedExists = await Medic.findOne({ email });
      if( isMedExists ) throw new Error(' El usuario ya esta registrado');
      const salt = await bcryptjs.genSaltSync(10);
      input.password = await bcryptjs.hashSync(password, salt);
      try {
        const medic = new Medic( input );
        medic.save();
        return medic;
      } catch (error) {
        console.log(error);
      }
    },
    authMedic: async ( _, { input } ) => {
      // Si el usuario existe
      const { email, password } = input;
      const isMedicExists = await  Medic.findOne({ email });
      if( !isMedicExists ) throw new Error('El usuario no existe');
      // Revisar si el password es correcto
      const comparePasswords = await bcryptjs.compareSync( password, isMedicExists.password );
      if( !comparePasswords ) throw new Error('El password es Incorrecto');
      return {
        token: createToken( isMedicExists, process.env.SECRET, '24h')
      }
    }
  }
}

module.exports = resolvers;