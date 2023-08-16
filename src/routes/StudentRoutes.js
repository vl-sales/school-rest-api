import { Router } from 'express';
import studentController from '../controllers/StudentController';

const studentsRouter = new Router();

studentsRouter.get('/', studentController.index);
studentsRouter.post('/', studentController.store);
studentsRouter.put('/:id', studentController.update);
studentsRouter.get('/:id', studentController.show);
studentsRouter.delete('/:id', studentController.delete);

export default studentsRouter;
