const { BlogPost, PostCategory, User, Category } = require('../models');

const newPost = async ({ title, content, categoryIds, userId }) => {
  const dataPost = { title, content, categoryIds, userId };
  
  const createdNewPost = await BlogPost.create({
    ...dataPost,
    published: new Date(),
    updated: new Date(),
  });
  const { id } = createdNewPost.dataValues;

  const addCategory = categoryIds.map((categoryId) =>
    PostCategory.create({ categoryId, postId: id }));
  await Promise.all(addCategory);

  return {
    id,
    title,
    content,
    userId,
  };
};

const getPost = async () => {
  const allPost = await BlogPost.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: 'password' },
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });
  return { status: 200, response: allPost };
};

const getIdPost = async (id) => {
  const getId = await BlogPost.findOne({
    where: { id },
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: 'password' },
    }, {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    }],
  });
  if (!getId) { return { status: 404, response: { message: 'Post does not exist' } }; }
  return { status: 200, response: getId };
};

const putPost = async (newDataPost, postId, user) => {
  // buscando o post que será alterado
  const dataPost = await BlogPost.findOne({
    where: { id: postId },
    include: [{ model: User, as: 'user', attributes: { excludes: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  // validando que não é possível editar um blogpost com outro usuário  
  const { id } = user;
  if (dataPost.userId !== id) {
    return {
      status: 401, response: { message: 'Unauthorized user' },
    };
  }
  // fazendo o update de dataPost e retornando status 200
  await dataPost.update(newDataPost);
  return { status: 200, response: dataPost };
};

const deletePost = async () => {

};

module.exports = {
  newPost,
  getPost,
  getIdPost,
  putPost,
  deletePost,
};