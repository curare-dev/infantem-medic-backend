const mongoose = require('mongoose');

const MedicsSchema = mongoose.Schema({
  sufijo: {
    type: String,
    trim: true
  },
  nombre: {
    type: String,
    trim: true,
    required: true,
  },
  apPaterno: {
    type: String,
    trim: true,
    required: true
  },
  apMaterno: {
    type: String,
    trim: true
  },
  especialidad: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  num: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Medic', MedicsSchema);