const mongoose = require('mongoose');
require('dotenv').config()

const connect = mongoose.connect(process.env.DB_URI);

// Check DB connection
connect.then(() => {
  console.log('Connected correctly to server');
})
connect.catch(() => {
  console.log('Error occured while connecting to database');
})

module.exports = connect;