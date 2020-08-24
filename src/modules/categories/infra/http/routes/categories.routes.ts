import { Router } from 'express';
import CategoriesController from '../controllers/CategoriesController';

const categoriesRouter = Router();

const categoriesController = new CategoriesController();

categoriesRouter.post('/', categoriesController.create);
categoriesRouter.get('/find/:id', categoriesController.index);
categoriesRouter.put('/update', categoriesController.update);

export default categoriesRouter;
