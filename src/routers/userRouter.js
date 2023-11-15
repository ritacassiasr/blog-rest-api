const router = require('express').Router();
const userController = require('../controller/userController');
const {
  validationDisplayName,
  validationPassword,
  validationEmail,
  validationToken,
} = require('../middlewares/validations');

router.get('/', validationToken, userController.getAllUsers);
router.get('/:id', userController.getId);

router.post(
  '/',
  validationDisplayName,
  validationPassword,
  validationEmail,
  userController.userPost,
);

module.exports = router;
