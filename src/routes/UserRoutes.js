import { Router } from 'express';
import UserController from '../controllers/UserController';

const userRouter = new Router();

userRouter.post('/create', (req, res) => {
  UserController.create(req, res);
});

export default userRouter;
