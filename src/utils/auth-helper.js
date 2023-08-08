import jwt from 'jsonwebtoken';
import { database } from '../config/site.config.js';

export const AuthHelper = (email) => ({
  AccessToken: jwt.sign({ email }, database['SECRET_KEY']),
  RefreshToken: jwt.sign({ email }, database['REFRESH_SECRET_KEY']),
});

export const GetTokenFromHeader = (req) => ({
  token: req.headers?.authorization?.split(' ')[1],
});

export const VerifyJwt = (token, options) => {
  return jwt.verify(token, database['SECRET_KEY'], options);
};
