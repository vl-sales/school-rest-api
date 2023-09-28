const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/db');
const Student = require('./Student');
const { default: appConfig } = require('../configs/appConfig');

class StudentIdentification extends Model {}

StudentIdentification.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    originalname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Original name is required',
        },
      },
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'File name is required',
        },
      },
    },
    url: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${appConfig.url}/images/${this.getDataValue('filename')}`;
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
    modelName: 'studentIdentification',
  },
);

Student.hasMany(StudentIdentification, { name: 'student_id' });
StudentIdentification.belongsTo(Student, {
  foreignKey: 'student_id', onDelete: 'CASCADE', onUpdate: 'CASCADE', allowNull: false,
});

module.exports = StudentIdentification;
