import { Router } from 'express';
import UserController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const userRouter = new Router();

userRouter.post('/create', UserController.create);
userRouter.put('/', loginRequired, UserController.update);
userRouter.delete('/', loginRequired, UserController.delete);

export default userRouter;
