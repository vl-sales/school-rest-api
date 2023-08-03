import { Router } from 'express';
import homeController from '../controllers/homeController';
import loginRequired from '../middlewares/loginRequired';

const homeRouter = new Router();

homeRouter.get('/', loginRequired, (req, res) => {
  homeController.index(req, res);
});

export default homeRouter;
