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
    return res.status(500).json({ error: err.message });
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

const getPost = async (req, res) => {
  try {
    const { status, response } = await postService.getPost(req.body);
    res.status(status).json(response);
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Erro Interno', error: err.message });
  }
};

const putPost = async (req, res) => {
  try {
    const { status, response } = await postService.putPost(
      req.body,
      req.params.id,
      req.user,
    );
    res.status(status).json(response);
  } catch (err) {
    return res.status(500).json({ message: 'Erro Interno', error: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { status, response } = await postService.putPost(
      req.params.id,
      req.headers.authorization,
    );
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
  putPost,
  deletePost,
};
