import { Router } from 'express';
import departmentsRouter from '@modules/deparments/infra/http/routes/departments.routes';
import categoriesRouter from '@modules/categories/infra/http/routes/categories.routes';

const routes = Router();

routes.use('/departments', departmentsRouter);
routes.use('/categories', categoriesRouter);

export default routes;
