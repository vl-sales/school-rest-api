const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/db');

class Student extends Model {}

Student.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      validate: {
        len: {
          args: [3, 255],
          msg: 'First name must be between 3 and 255 characters.',
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      validate: {
        len: {
          args: [3, 255],
          msg: 'Last Name must be between 3 and 255 characters.',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Invalid e-mail',
        },
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: {
          msg: 'Age must be integer',
        },
      },
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: {
          msg: 'Weight must be float',
        },
      },
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: {
          msg: 'Height must be float',
        },
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
    modelName: 'Students',
  },
);

module.exports = Student;
