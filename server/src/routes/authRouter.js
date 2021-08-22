const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');
const { body } = require('express-validator');
const checkAuth = require('../middlewars/checkAuth');

authRouter.post(
  '/signup',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  authController.signUp
);
authRouter.post('/signin', authController.signIn);
authRouter.get('/signout', authController.signOut);
authRouter.get('/check', checkAuth, authController.check);

module.exports = authRouter;
