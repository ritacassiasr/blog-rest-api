const { authenticateToken } = require('../utils/JWT');
const { User } = require('../models');

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

const validationToken = async (req, res, next) => {
  const token = req.header('authorization');
  if (!token) return res.status(401).json({ message: 'Token not found' });
  const { validToken } = authenticateToken(token);
  if (!validToken) return res.status(401).json({ message: 'Expired or invalid token' }); 
  next();
};

module.exports = {
  validationLogin,
  validationDisplayName,
  validationEmail,
  validationPassword,
  validationToken,
};