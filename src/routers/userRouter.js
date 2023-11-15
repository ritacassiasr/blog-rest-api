const router = require('express').Router();
const userController = require('../controller/userController');
const { validationDisplayName,
  validationPassword,
  validationEmail } = require('../middlewares/validations');

router.post(
  '/',
  validationDisplayName,
  validationPassword,
  validationEmail,
  userController.userPost,
);

module.exports = router;
