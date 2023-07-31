import { Router } from 'express';
import UserController from '../controllers/UserController';

const userRouter = new Router();

userRouter.post('/create', UserController.create);
userRouter.get('/', UserController.index);
userRouter.get('/:id', UserController.show);
userRouter.put('/:id', UserController.update);
userRouter.delete('/:id', UserController.delete);

export default userRouter;
