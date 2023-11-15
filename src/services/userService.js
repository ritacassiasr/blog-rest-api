const { User } = require('../models');
const { generateToken } = require('../utils/JWT');

const userPost = async ({ displayName, email, password, image }) => {
  const dataUser = { displayName, email, password, image };
  await User.create(dataUser); 
  const token = generateToken({ displayName, email, password });
  return { status: 201, response: { token } };
};

module.exports = {
  userPost,
};