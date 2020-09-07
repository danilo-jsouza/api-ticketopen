import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/persons/infra/http/middlewares/ensureAuthenticated';
import checkRule from '@modules/persons/infra/http/middlewares/checkRule';
import TicketsController from '../controllers/TicketsController';

const ticketsRouter = Router();

const ticketsController = new TicketsController();

ticketsRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
      category_id: Joi.string().uuid().required(),
    },
  }),
  ticketsController.create,
);
ticketsRouter.get('/find/all', ensureAuthenticated, ticketsController.all);
ticketsRouter.get(
  '/find/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ticketsController.index,
);
ticketsRouter.put(
  '/update/admin',
  [ensureAuthenticated, checkRule],
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().uuid().required(),
      recipient_id: Joi.string().uuid().required(),
    },
  }),
  ticketsController.adiminUpdate,
);
ticketsRouter.put(
  '/update/user',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().uuid().required(),
      category_id: Joi.string().uuid().required(),
      description: Joi.string().required(),
      status: Joi.number().required(),
    },
  }),
  ticketsController.userUpdate,
);

export default ticketsRouter;
