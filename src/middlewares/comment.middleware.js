import { GetTokenFromHeader, VerifyJwt } from '../utils/auth-helper.js';
import { duplicatedMiddlewares } from '../utils/helpers.js';
import { User } from '../models/User.js';

class CommentMiddleware {
  async ADD_COMMENT_VALID(req, res, next) {
    try {
      if (!Object.keys(req.body)) {
        return res.status(400).json({ error: 'Bad Request!' });
      }
      const { token } = GetTokenFromHeader(req);
      duplicatedMiddlewares(req, res, null, token);

      const { email } = VerifyJwt(token);

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ error: 'User Not Found!' });
      }

      req.user_id = user.id;

      next();
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}

export default new CommentMiddleware();
