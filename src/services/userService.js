const { User } = require('../models');
const { generateToken } = require('../utils/JWT');

const userPost = async ({ displayName, email, password, image }) => {
  const dataUser = { displayName, email, password, image };
  await User.create(dataUser); 
  const token = generateToken({ displayName, email, password });
  return { status: 201, response: { token } };
};

const getAllUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: 'password' } });
  return { status: 200, response: users };
};

const getId = async (id) => {
  const userId = await User.findOne({ where: { id }, attributes: { exclude: 'password ' } });
  if (!userId) {
    return {
      status: 404,
      response: {
        message: 'User does not exist',
      },
    }; 
  }
  return { status: 200, response: userId };
};

module.exports = {
  userPost,
  getAllUsers,
  getId,
};