const Medic = require("../models/Medics");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
const MedicLocation = require("../models/MedicLocation");

const createToken = ( medic, secret, expiresIn ) => {
  return jwt.sign( { id: medic.id }, secret, { expiresIn } );
}

// Resolvers
const resolvers = {
  Query: {
    getMedic: async ( _, { token }) => {
      const { id } = await jwt.verify( token, process.env.SECRET );
      const medic = await Medic.findById(id);
      return medic;
    },
    getLocation: async ( _, { id }) => {
      const medicLocation = await MedicLocation.findOne({ medicId: id });
      return medicLocation;
    },
    verifyToken: async ( _, { token }) => {
      try {
        await jwt.verify( token ,process.env.SECRET );
        return true;
      } catch (error) {
        return false;
      }
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
        throw new Error(error);
      }
    },
    medicLocation: async (_, { input }) => {
      console.log( input );
      try {
        const medicLocation = new MedicLocation( input );
        medicLocation.save();
        return "Location saved correctly";
      } catch (error) {
        throw new Error(error);
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