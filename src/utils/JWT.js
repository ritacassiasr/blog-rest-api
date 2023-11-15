const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'suaSenhaSecreta';

const generateToken = (name, email, id) => {
  const payload = { name, email, id };
  const token = jwt.sign(payload, secret);
  return token;
};

const authenticateToken = (token) => {
  try {
    const userAuth = jwt.verify(token, secret);
    return { validToken: true, userAuth };
  } catch (error) {
    return false;
  }
};
module.exports = {
  generateToken,
  authenticateToken,
};
