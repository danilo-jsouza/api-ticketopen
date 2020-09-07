import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import PersonsController from '../controllers/PersonsController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const personsRouter = Router();

const personsController = new PersonsController();

personsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      department_id: Joi.string().uuid().required(),
    },
  }),
  personsController.create,
);
personsRouter.get(
  '/find/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ensureAuthenticated,
  personsController.index,
);

export default personsRouter;
