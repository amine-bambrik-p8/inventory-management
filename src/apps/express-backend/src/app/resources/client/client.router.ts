import { ClientController } from './controller/client.controller';
import { clientRoutes } from './client.routes';
import { mount } from '../../utils/route.utils';
import { Router } from "express";
const controller = new ClientController();
const router = Router();
mount(controller,clientRoutes,router);
export const clientRouter = router;