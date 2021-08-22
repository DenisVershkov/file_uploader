const authService = require('../service/auth.service');
const { validationResult } = require('express-validator');
const User = require('../models/user-model');
const ApiError = require('../exceptions/api-error');

class UserController {
  async signUp(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
      }
      const userData = await authService.signUp(req.body);
      req.session.user = {
        id: userData.id,
        name: userData.username,
      };
      return res.status(200).json(userData);
    } catch (err) {
      next(err);
    }
  }

  async signIn(req, res, next) {
    try {
      const userData = await authService.signIn(req.body);
      req.session.user = {
        id: userData.id,
        name: userData.username,
      };
      return res.status(200).json(userData);
    } catch (err) {
      next(err);
    }
  }

  async signOut(req, res) {
    req.session.destroy((err) => {
      if (err) return res.sendStatus(500);
      res.clearCookie(req.app.get('cookieName'));
      return res.sendStatus(200);
    });
  }

  async check(req, res) {
    try {
      const user = await User.findById(req.session.user.id, { password: 0 });
      return res.status(200).json(user);
    } catch (error) {
      return res.sendStatus(500);
    }
  }
}

module.exports = new UserController();
