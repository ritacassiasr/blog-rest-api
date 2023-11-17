const router = require('express').Router();
const postController = require('../controller/postController');
const {
  validationToken,
  validationNewPost,
} = require('../middlewares/validations');

router.post('/', validationToken, validationNewPost, postController.newPost);
router.get('/', validationToken, postController.getPost);
router.get('/:id', validationToken, postController.getIdPost);

module.exports = router;
