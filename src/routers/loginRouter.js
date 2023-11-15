const router = require('express').Router();
const loginController = require('../controller/loginController');
const { validationLogin } = require('../middlewares/validations');

router.post('/', validationLogin, loginController.login);

module.exports = router;