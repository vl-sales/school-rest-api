const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('school', process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
  dialect: 'mariadb',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    createdAt: 'created_at',
    updateAt: 'update_at',
  },
  dialectOptions: {
    timezone: 'America/Sao_Paulo',
  },
  timezone: 'America/Sao_Paulo',
});

module.exports = sequelize;
