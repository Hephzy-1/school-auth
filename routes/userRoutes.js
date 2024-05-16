const express = require('express');
const auth = express.Router();
const { register, login } = require('../controllers/userCon');

auth.post('/signup', register);
auth.post('/login', login);

module.exports = auth;