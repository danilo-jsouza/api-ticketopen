import { Router } from 'express';
import ensureAuthenticated from '@modules/persons/infra/http/middlewares/ensureAuthenticated';
import checkRule from '@modules/persons/infra/http/middlewares/checkRule';
import TicketsController from '../controllers/TicketsController';

const ticketsRouter = Router();

const ticketsController = new TicketsController();

ticketsRouter.post('/', ensureAuthenticated, ticketsController.create);
ticketsRouter.get('/find/all', ensureAuthenticated, ticketsController.all);
ticketsRouter.get('/find/:id', ensureAuthenticated, ticketsController.index);
ticketsRouter.put(
  '/update/admin',
  [ensureAuthenticated, checkRule],
  ticketsController.adiminUpdate,
);
ticketsRouter.put(
  '/update/user',
  ensureAuthenticated,
  ticketsController.userUpdate,
);

export default ticketsRouter;
