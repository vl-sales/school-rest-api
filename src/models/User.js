const { DataTypes, Model } = require('sequelize');
const bcryptjs = require('bcryptjs');
const sequelize = require('../database/db');

class User extends Model {}

function passwordValidation(value) {
  if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z\d\s]).*$/.test(value)) {
    throw new Error('Password must contain letters, numbers and special characters');
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      validate: {
        len: {
          args: [3, 255],
          msg: 'Name field must contain between 3 and 255 characters',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: {
        msg: 'E-mail must be unique',
      },
      validate: {
        isEmail: {
          msg: 'Invalid email',
        },
      },
    },
    password_hash: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    password: {
      type: DataTypes.VIRTUAL,
      allowNull: true,
      validate: {
        len: {
          args: [3, 50],
          msg: 'Password field must contain between 3 and 255 characters',
        },
        passwordValidation,
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Users',
  },
);

User.addHook('beforeSave', async (user) => {
  if (user.password) {
    user.password_hash = await bcryptjs.hash(user.password, 8);
  }
});

module.exports = User;
