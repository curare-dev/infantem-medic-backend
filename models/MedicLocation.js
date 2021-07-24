const mongoose = require('mongoose');

const MedicLocationSchema = mongoose.Schema({
  medicId: {
    type: String,
    trim: true,
    required: true,
  },
  street: {
    type: String,
    trim: true
  },
  number: {
    type: Number,
    trim: true,
    required: true,
  },
  city: {
    type: String,
    trim: true,
    required: true
  },
  state: {
    type: String,
    trim: true,
    required: true
  },
  postalCode: {
    type: String,
    trim: true,
    required: true
  },
  country: {
    type: String,
    trim: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('MedicLocation', MedicLocationSchema);