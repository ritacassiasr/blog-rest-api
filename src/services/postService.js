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
    includes: [
      {
        model: User,
        as: 'user',
        attributes: { excludes: 'password' },
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });
  console.log(allPost);
  return { status: 200, response: allPost };
};

const getIdPost = async (id) => {
  const getId = await BlogPost.findOne({
    where: { id },
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
  return { status: 200, response: getId };
};

module.exports = {
  newPost,
  getPost,
  getIdPost,
};