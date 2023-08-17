import { Router } from 'express';
import studentController from '../controllers/StudentController';
import loginRequired from '../middlewares/loginRequired';

const studentsRouter = new Router();

studentsRouter.get('/', studentController.index);
studentsRouter.post('/', loginRequired, studentController.store);
studentsRouter.put('/:id', loginRequired, studentController.update.bind(studentController));
studentsRouter.get('/show/:id', studentController.show.bind(studentController));
studentsRouter.delete('/:id', loginRequired, studentController.delete.bind(studentController));

export default studentsRouter;
