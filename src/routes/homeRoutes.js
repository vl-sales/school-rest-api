import { Router } from 'express';
import homeController from '../controllers/homeController';

const homeRouter = new Router();

homeRouter.get('/', (req, res) => {
  homeController.index(req, res);
});

export default homeRouter;
