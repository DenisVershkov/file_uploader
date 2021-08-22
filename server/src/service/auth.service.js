const User = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const UserDto = require('../dto/user-dto');
const ApiError = require('../exceptions/api-error');

class UserService {
  async signUp({ email, password, username }) {
    const candidate = await User.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с почтовым адресом уже существует`);
    }
    const hashPassword = await bcrypt.hash(password, 11);
    const newUser = await User.create({
      username,
      password: hashPassword,
      email,
    });
    const userDto = new UserDto(newUser);
    return {
      ...userDto,
    };
  }

  async signIn({ email, password }) {
    const candidate = await User.findOne({ email });
    if (!candidate) {
      throw ApiError.BadRequest(`Пользователь c таким email не найден`);
    }
    const isPassEquals = await bcrypt.compare(password, candidate.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest(`Неверный пароль`);
    }
    const userDto = new UserDto(candidate);
    return {
      ...userDto,
    };
  }
}

module.exports = new UserService();
