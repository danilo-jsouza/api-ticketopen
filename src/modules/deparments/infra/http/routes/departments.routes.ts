import { Router } from 'express';
import ensureAuthenticated from '@modules/persons/infra/http/middlewares/ensureAuthenticated';
import checkRule from '@modules/persons/infra/http/middlewares/checkRule';
import DepartmentsController from '../controllers/DepartmentsController';

const departmentsRouter = Router();

const departmentsController = new DepartmentsController();

departmentsRouter.post(
  '/',
  [ensureAuthenticated, checkRule],
  departmentsController.create,
);
departmentsRouter.get(
  '/find/all',
  ensureAuthenticated,
  departmentsController.all,
);

departmentsRouter.get(
  '/find/:id',
  ensureAuthenticated,
  departmentsController.index,
);

departmentsRouter.put(
  '/update',
  [ensureAuthenticated, checkRule],
  departmentsController.update,
);

departmentsRouter.delete(
  '/delete/:id',
  [ensureAuthenticated, checkRule],
  departmentsController.delete,
);

export default departmentsRouter;
