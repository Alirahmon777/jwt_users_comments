import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';
import AuthMiddleware from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';

export const authRoutes = Router();

authRoutes.post(
  '/sign-up',
  upload.single('image'),
  AuthMiddleware.checkDuplicateEmail,
  AuthController.SIGN_UP,
);
authRoutes.post('/sign-in', AuthController.SIGN_IN);
