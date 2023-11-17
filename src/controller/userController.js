const userService = require('../services/userService');

const userPost = async (req, res) => {
  try {
    const { response, status } = await userService.userPost(req.body);
    return res.status(status).json(response);
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Erro Interno', error: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { response, status } = await userService.getAllUsers(req.body);
    return res.status(status).json(response);
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Erro Interno', error: err.message });
  }
};

const getId = async (req, res) => {
  try {
    const { id } = req.params;
    const { response, status } = await userService.getId(id);
    res.status(status).json(response);
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Erro Interno', error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { status } = await userService.deleteUser(req.user);
    return res.status(status).end();
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Erro Interno', error: err.message });
  }
};
module.exports = {
  userPost,
  getAllUsers,
  getId,
  deleteUser,
};
