const { body } = require('express-validator');

const registerValidation = [
  body('username').isLength({ min: 2 }).withMessage('username too short'),
  body('email').isEmail().withMessage('invalid email'),
  body('password').isLength({ min: 6 }).withMessage('password too short'),
];

const loginValidation = [
  body('email').isEmail(),
  body('password').exists()
];

const postValidation = [
  body('title').notEmpty().withMessage('title required'),
  body('text').notEmpty().withMessage('text required'),
];

module.exports = { registerValidation, loginValidation, postValidation };
