import { Router } from 'express';
import TokenController from '../controllers/TokenController';

const tokenRouter = new Router();

tokenRouter.post('/', (req, res) => {
  TokenController.store(req, res);
});

export default tokenRouter;
