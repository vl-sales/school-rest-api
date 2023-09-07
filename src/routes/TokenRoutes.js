import { Router } from 'express';
import TokenController from '../controllers/TokenController';

const tokenRouter = new Router();
const tokenController = new TokenController();

tokenRouter.post('/', (req, res) => {
  tokenController.store(req, res);
});

export default tokenRouter;
