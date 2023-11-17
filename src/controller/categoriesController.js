const categoriesService = require('../services/categoriesService');

const postCategory = async (req, res) => {
  try {
    const { status, response } = await categoriesService.postCategory(req.body);
    res.status(status).json(response);
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Erro Interno', error: err.message });
  }
};

const getCategory = async (req, res) => {
  try {
    const { response, status } = await categoriesService.getCategory(req.body);
    return res.status(status).json(response);
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Erro Interno', error: err.message });
  }
};
module.exports = {
  postCategory,
  getCategory,
};
