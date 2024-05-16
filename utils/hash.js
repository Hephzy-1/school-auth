const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
  return bcrypt.hashSync(password, 10);
}

const comparePassword = async (password, userPassword) => {
  await bcrypt.compare(password, userPassword)
}

// let pass = hashPassword('tyiwx')
// console.log(pass)

module.exports = {
  hashPassword,
  comparePassword
}