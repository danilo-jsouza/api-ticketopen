import { Router } from 'express';
import departmentsRouter from '@modules/deparments/infra/http/routes/departments.routes';
import categoriesRouter from '@modules/categories/infra/http/routes/categories.routes';
import personsRouter from '@modules/persons/infra/http/routes/persons.routes';
import sessionsRouter from '@modules/persons/infra/http/routes/sessions.routes';
import ticketsRouter from '@modules/tickets/infra/http/routes/tickets.routes';

const routes = Router();

routes.use('/departments', departmentsRouter);
routes.use('/categories', categoriesRouter);
routes.use('/persons', personsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/tickets', ticketsRouter);

export default routes;
