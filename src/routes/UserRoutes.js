import { Router } from 'express';
import UserController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const userRouter = new Router();
const userController = new UserController();

userRouter.post('/create', userController.create);
userRouter.put('/:id', loginRequired, userController.update);
userRouter.delete('/:id', loginRequired, userController.delete);

export default userRouter;
