const mongoose = require('mongoose');

// Create user schema
const register = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  DOB: {
    type: Date,
    required: true
  }
});

const collection = mongoose.model('User', register);

module.exports = collection;