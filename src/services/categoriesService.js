const { Category } = require('../models');

const postCategory = async ({ name }) => {
  const data = { name };
  await Category.create(data);
  const findCategory = await Category.findOne({ where: { name } });
  return { status: 201, response: findCategory };
};

const getCategory = async () => {
  const categories = await Category.findAll();
  return { status: 200, response: categories };
};

module.exports = {
  postCategory,
  getCategory,
};