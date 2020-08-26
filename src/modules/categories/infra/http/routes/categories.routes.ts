import { Router } from 'express';
import checkRule from '@modules/persons/infra/http/middlewares/checkRule';
import ensureAuthenticated from '@modules/persons/infra/http/middlewares/ensureAuthenticated';
import CategoriesController from '../controllers/CategoriesController';

const categoriesRouter = Router();

const categoriesController = new CategoriesController();

categoriesRouter.post(
  '/',
  [ensureAuthenticated, checkRule],
  categoriesController.create,
);

categoriesRouter.get(
  '/find/:id',
  ensureAuthenticated,
  categoriesController.index,
);

categoriesRouter.put(
  '/update',
  [ensureAuthenticated, checkRule],
  categoriesController.update,
);

export default categoriesRouter;
