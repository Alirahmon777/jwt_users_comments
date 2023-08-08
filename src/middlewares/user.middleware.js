import { duplicatedMiddlewares } from '../utils/helpers.js';
import { GetTokenFromHeader } from '../utils/auth-helper.js';

class UserMiddleware {
  verifyToken = (req, res, next) => {
    const { token } = GetTokenFromHeader(req);
    duplicatedMiddlewares(req, res, next, token);
  };
}

export default new UserMiddleware();
