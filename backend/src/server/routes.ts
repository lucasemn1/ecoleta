import { Router, Request, Response } from 'express';
const routes = Router();

import PointController from '../app/controllers/PointController';
import ItemController from '../app/controllers/ItemController';

routes.get('/items', ItemController.index);
routes.get('/point/:id', PointController.show);
routes.post('/point', PointController.store);
routes.get('/points', PointController.index);

export default routes;