const { User, Category } = require('../models');
const { authenticateToken } = require('../utils/JWT');

const validationLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Some required fields are missing' });
  }
  return next();
};
const validationDisplayName = (req, res, next) => {
  const { displayName } = req.body;
  if (displayName.length < 8) {
    return res
      .status(400)
      .json({
        message: '"displayName" length must be at least 8 characters long',
      });    
  }
  next();
};

const validationName = (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(400).json({ message: '"name" is required' });
  }
  next();
};

const validationEmail = async (req, res, next) => {
  const { email } = req.body;
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!regex.test(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
  
  const emailExist = await User.findOne({ where: { email } });
  if (emailExist) return res.status(409).json({ message: 'User already registered' }); 
  next();
};
const validationPassword = (req, res, next) => {
  const { password } = req.body;
  if (password.length < 6) {
    return res.status(400)
      .json({ message: '"password" length must be at least 6 characters long' });
  }
  next();
};
const validationToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) { return res.status(401).json({ message: 'Token not found' }); }
  const authorizationWithoutBearer = authorization.split(' ');
  const { validToken, userAuth } = authenticateToken(
    authorizationWithoutBearer[1],
  );
  if (!validToken) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  req.user = userAuth;
  next();
};

const validationNewPost = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  if (!title || !content || !categoryIds) {
    return res
      .status(400)
      .json({ message: 'Some required fields are missing' });
  }

  const categories = await Category.findAll({
    where: { id: categoryIds },
  });

  if (categories.length !== categoryIds.length) {
    return res
      .status(400)
      .json({ message: 'one or more "categoryIds" not found' });
  }
  next();
};

module.exports = {
  validationLogin,
  validationDisplayName,
  validationEmail,
  validationPassword,
  validationToken,
  validationName,
  validationNewPost,
};