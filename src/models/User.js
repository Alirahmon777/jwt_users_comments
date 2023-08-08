import { sq } from '../db/db.js';
import { DataTypes } from 'sequelize';

export const User = sq.define(
  'users',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },

    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING,
    },

    image_filename: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  },
);
