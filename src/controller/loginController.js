const loginService = require('../services/loginService');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { response, status } = await loginService.login(email, password);
    return res.status(status).json(response);
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Erro Interno', error: err.message });
  }
};

module.exports = {
  login,
};
