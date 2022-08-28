const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user_model = require('../../model/user.model')
require('dotenv').config()

module.exports = {
  admin_login: async ({ username, password }) => {
    try {
      const user_exist = await user_model.findOne({ username, role: "ADMIN" })
      let user = user_exist
      if (!user_exist) {
        const hashedPassword = await bcrypt.hash(password, 12);
        user = await user_model.create({
          username,
          password: hashedPassword,
          role: "ADMIN"
        })
      }


      const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.JWT_KEY,
        {
          expiresIn: '1d'
        }
      );

      return { userId: user._id, username: user.username, token: token };
    }
    catch (err) {
      throw err;
    }
  },
  user_login: async ({ username, password }) => {
    try {
      const user_exist = await user_model.findOne({ username, role: "USER" })
      let user = user_exist
      if (!user_exist) {
        const hashedPassword = await bcrypt.hash(password, 12);
        user = await user_model.create({
          username,
          password: hashedPassword,
          role: "USER"

        })
      }


      const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.JWT_KEY,
        {
          expiresIn: '1d'
        }
      );

      return { userId: user._id, username: user.username, token: token };
    }
    catch (err) {
      throw err;
    }
  },
}