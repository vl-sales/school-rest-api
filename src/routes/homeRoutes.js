import { Router } from 'express';
import HomeController from '../controllers/homeController';

const homeRouter = new Router();
const homeController = new HomeController();

homeRouter.get('/', homeController.index);

export default homeRouter;
