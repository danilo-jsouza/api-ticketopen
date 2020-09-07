import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import checkRule from '@modules/persons/infra/http/middlewares/checkRule';
import ensureAuthenticated from '@modules/persons/infra/http/middlewares/ensureAuthenticated';
import CategoriesController from '../controllers/CategoriesController';

const categoriesRouter = Router();

const categoriesController = new CategoriesController();

categoriesRouter.post(
  '/',
  [ensureAuthenticated, checkRule],
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      department_id: Joi.string().uuid().required(),
    },
  }),
  categoriesController.create,
);

categoriesRouter.get(
  '/find/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  categoriesController.index,
);

categoriesRouter.put(
  '/update',
  [ensureAuthenticated, checkRule],
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().uuid().required(),
      name: Joi.string().required(),
    },
  }),
  categoriesController.update,
);

export default categoriesRouter;
