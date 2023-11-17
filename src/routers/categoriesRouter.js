const router = require('express').Router();
const categoriesController = require('../controller/categoriesController');
const {
  validationToken,
  validationName,
} = require('../middlewares/validations');

router.get('/', validationToken, categoriesController.getCategory);
router.post(
  '/',
  validationName,
  validationToken,
  categoriesController.postCategory,
);

module.exports = router;
