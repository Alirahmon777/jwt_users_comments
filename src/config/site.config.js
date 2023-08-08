import { join } from 'path';

export const development = {
  PORT: process.env['PORT'] || 3000,
  HOST: process.env['HOST'] || 'localhost',
  PUBLIC: join(process.cwd(), 'public'),
};

export const database = {
  DB_URI: process.env.PSQL_URI,
  SECRET_KEY: process.env.JWT_SECRET_KEY,
  REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY,
};
