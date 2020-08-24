import { Router } from 'express';
import departmentsRouter from '@modules/deparments/infra/http/routes/departments.routes';

const routes = Router();

routes.use('/departments', departmentsRouter);

export default routes;
