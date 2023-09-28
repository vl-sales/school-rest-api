import { Router } from 'express';
import IdentificationController from '../controllers/IdentificationController';
import loginRequired from '../middlewares/loginRequired';

const identificationRouter = new Router();
const identificationController = new IdentificationController();

identificationRouter.post('/:studentId', loginRequired, identificationController.store.bind(identificationController));

export default identificationRouter;
