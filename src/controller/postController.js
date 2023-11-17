const postService = require('../services/postService');

const newPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id } = req.user;
    
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
    const { status, response } = await postService.getIdPost(req.params.id);
    res.status(status).json(response);
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Erro Interno', error: err });
  }
};

const putPost = async (req, res) => {
  try {
    const { status, response } = await postService.putPost(req.body, req.params.id);
    res.status(status).json(response);
  } catch (err) {
    return res.status(500).json({ message: 'Erro Interno', error: err.message });
  }
};

module.exports = {
  newPost,
  getPost,
  getIdPost,
  putPost,
};
