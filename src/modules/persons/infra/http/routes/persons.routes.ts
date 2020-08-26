import { Router } from 'express';
import PersonsController from '../controllers/PersonsController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const personsRouter = Router();

const personsController = new PersonsController();

personsRouter.post('/', personsController.create);
personsRouter.get('/find/:id', ensureAuthenticated, personsController.index);

export default personsRouter;
