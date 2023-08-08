import { Router } from 'express';
import UserController from '../controllers/user.controller.js';
import UserMiddleware from '../middlewares/user.middleware.js';

export const userRoutes = Router();

userRoutes.get('/users', UserController['GET_USERS']);
userRoutes.get(
  '/user',
  UserMiddleware['verifyToken'],
  UserController['GET_USER'],
);
userRoutes.delete('/users/:id', UserController['DELETE_USERS']);
