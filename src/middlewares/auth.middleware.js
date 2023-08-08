import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import { database } from '../config/site.config.js';
import { GetTokenFromHeader } from '../utils/auth-helper.js';
class AuthMiddleware {
  checkDuplicateEmail = (req, res, next) => {
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        return res.status(400).send({
          message: 'Failed! User is already in use!',
        });
      }

      next();
    });
  };
}

export default new AuthMiddleware();
