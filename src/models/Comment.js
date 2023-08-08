import { sq } from '../db/db.js';
import { DataTypes } from 'sequelize';
import { User } from './User.js';

export const Comment = sq.define(
  'comments',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING(124),
      allowNull: false,
    },

    body: {
      type: DataTypes.STRING(512),
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    timestamps: true,
  },
);
