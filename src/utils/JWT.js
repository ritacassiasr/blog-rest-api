const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'suaSenhaSecreta';

const generateToken = (name, email, id) => {
  const payload = { name, email, id };
  const token = jwt.sign(payload, secret);
  return token;
};

module.exports = {
  generateToken,
};
