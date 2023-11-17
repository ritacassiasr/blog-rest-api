const postService = require('../services/postService');

const newPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id } = req.user;
    console.log(req.user);

    const createdPost = await postService.newPost({
      title,
      content,
      categoryIds,
      userId: id,
    });
    return res.status(201).json(createdPost);
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Erro Interno', error: err.message });
  }
};

const getPost = async (_req, res) => {
  try {
    const { status, response } = await postService.getPost();
    res.status(status).json(response);
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Erro Interno', error: err.message });
  }
};

const getIdPost = async (req, res) => {
  try {
    const { status, response } = await postService.getIdPost(req.body);
    res.status(status).json(response);
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Erro Interno', error: err.message });
  }
};

module.exports = {
  newPost,
  getPost,
  getIdPost,
};
