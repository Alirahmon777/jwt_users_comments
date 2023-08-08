import { User } from '../models/User.js';
import { GetTokenFromHeader, VerifyJwt } from '../utils/auth-helper.js';
import { Comment } from '../models/Comment.js';
import { DeleteFile, ExistsFile } from '../utils/filesystem.js';
import { join } from 'path';

class UserController {
  async GET_USERS(req, res) {
    try {
      const users = await User.findAll({
        include: [{ model: Comment, as: 'comments' }],
      });

      const usersWithAllComments = await Promise.all(
        users.map(async (user) => {
          const comments = await Comment.findAll({
            where: { user_id: user.id }, // Replace with the actual column name
          });
          return {
            ...user.toJSON(),
            comments,
          };
        }),
      );

      res.status(200).json({ data: usersWithAllComments });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  // token req.headers.authorizationda keladi masalan: Authorization: Bearer token
  async GET_USER(req, res) {
    try {
      const { token } = GetTokenFromHeader(req);

      const { email } = await VerifyJwt(token);

      const user = await User.findOne({ where: { email } });

      const usersWithAllComments = async () => {
        const comments = await Comment.findAll({
          where: { user_id: user.id },
        });
        return {
          ...user.toJSON(),
          comments,
        };
      };

      res.status(200).json({ data: await usersWithAllComments() });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  async DELETE_USERS(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findOne({
        where: {
          id,
        },
      });

      if (!user) {
        return res.status(404).json({ error: 'Not found!' });
      }

      await User.destroy({
        where: {
          id,
        },
      });

      if (ExistsFile(join('public', user?.image_filename))) {
        DeleteFile(join('public', user.image_filename));
      }

      res.status(200).json({ data: user });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}

export default new UserController();
