import { Comment } from '../models/Comment.js';

class CommentController {
  async GET_COMMENTS(req, res) {
    try {
      const comments = await Comment.findAll();

      res.status(200).json({ data: comments });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  async ADD_COMMENTS(req, res) {
    try {
      const { title, body } = req.body;
      const user_id = req.user_id;
      Comment.create({
        title,
        body,
        user_id: Number(user_id),
      })
        .then((user) => {
          return res.status(201).json({
            message: `Comment successfully added to user id ${user_id}`,
          });
        })
        .catch((err) => {
          return res.status(500).json({ message: err.message });
        });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
}

export default new CommentController();
