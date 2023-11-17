const { User } = require('../models');
const { generateToken } = require('../utils/JWT');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });
  if (!user) { return { status: 400, response: { message: 'Invalid fields' } }; }
  const token = generateToken(user.displayName, user.email, user.id);
  return { status: 200, response: { token } };
};

module.exports = {
  login,
};