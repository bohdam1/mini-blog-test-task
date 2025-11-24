const router = require('express').Router();
const { registerValidation, loginValidation } = require('../utils/validators');
const { register, login } = require('../controllers/authController');

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

module.exports = router;
