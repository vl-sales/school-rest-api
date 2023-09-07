import { Router } from 'express';
import UploadController from '../controllers/UploadController';

const uploadRouter = new Router();
const uploadController = new UploadController();

uploadRouter.post('/', uploadController.store.bind(uploadController));

export default uploadRouter;
