const router = require('express').Router();
const postController = require('../controller/postController');
const {
  validationToken,
  validationNewPost,
  validationUpdatePost,
} = require('../middlewares/validations');

router.post('/', validationToken, validationNewPost, postController.newPost);
router.get('/', validationToken, postController.getPost);
router.get('/:id', validationToken, postController.getIdPost);
router.put('/:id', validationToken, validationUpdatePost, postController.putPost);
router.delete('/:id', validationToken, postController.deletePost);

module.exports = router;
