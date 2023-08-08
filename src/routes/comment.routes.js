import { Router } from 'express';
import CommentController from '../controllers/comment.controller.js';
import CommentMiddleware from '../middlewares/comment.middleware.js';

export const commentRoutes = Router();

commentRoutes.get('/comments', CommentController.GET_COMMENTS);
commentRoutes.post(
  '/comments',
  CommentMiddleware.ADD_COMMENT_VALID,
  CommentController.ADD_COMMENTS,
);
