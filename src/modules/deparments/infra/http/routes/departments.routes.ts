import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/persons/infra/http/middlewares/ensureAuthenticated';
import checkRule from '@modules/persons/infra/http/middlewares/checkRule';
import DepartmentsController from '../controllers/DepartmentsController';

const departmentsRouter = Router();

const departmentsController = new DepartmentsController();

departmentsRouter.post(
  '/',
  [ensureAuthenticated, checkRule],
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
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
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  departmentsController.index,
);

departmentsRouter.put(
  '/update',
  [ensureAuthenticated, checkRule],
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().uuid().required(),
      name: Joi.string().required(),
    },
  }),
  departmentsController.update,
);

departmentsRouter.delete(
  '/delete/:id',
  [ensureAuthenticated, checkRule],
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  departmentsController.delete,
);

export default departmentsRouter;
