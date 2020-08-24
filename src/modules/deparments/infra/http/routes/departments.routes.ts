import { Router } from 'express';
import DepartmentsController from '../controllers/DepartmentsController';

const departmentsRouter = Router();

const departmentsController = new DepartmentsController();

departmentsRouter.post('/', departmentsController.create);
departmentsRouter.get('/find/:id', departmentsController.index);
departmentsRouter.put('/update', departmentsController.update);
departmentsRouter.delete('/delete/:id', departmentsController.delete);

export default departmentsRouter;
