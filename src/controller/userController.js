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

module.exports = {
  userPost,
};
