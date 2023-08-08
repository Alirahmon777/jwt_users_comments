import { Sequelize } from 'sequelize';
import { database } from '../config/site.config.js';

export const sq = new Sequelize(database['DB_URI'], {
  logging: false,
});

export const testDbConnection = async () => {
  try {
    await sq.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
