import { clientPipes } from './client.pipes';
import { ClientController } from './controller/client.controller';
import { clientRoutes } from './client.routes';
import { mount } from '../../utils/crud/route.utils';
import { Router } from "express";
const controller = new ClientController();
const router = Router();
mount(controller,clientRoutes,router,clientPipes);
export const clientRouter = router;