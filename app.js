import dotenv from 'dotenv';
import express from 'express';
import homeRouter from './src/routes/homeRoutes';
import sequelize from './src/database/db';
import userRouter from './src/routes/UserRoutes';
// Importação de modelos
import './src/models/Student';
import './src/models/User';

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.dbInitialization();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', homeRouter);
    this.app.use('/users', userRouter);
  }

  dbAuthentication() {
    sequelize.authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch((err) => {
        console.error('Unable to connect to the database:', err);
      });
  }

  syncDb() {
    sequelize.sync()
      .then(() => {
        console.log('database has been synchronized');
      })
      .catch(() => {
        console.log('Unable to sync the database');
      });
  }

  dbInitialization() {
    this.dbAuthentication();
    this.syncDb();
  }
}

export default new App().app;
