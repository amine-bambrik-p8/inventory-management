import { orderPipes } from './order.pipes';
import { OrderController } from './controller/order.controller';
import { orderRoutes } from './order.routes';
import { mount } from '../../utils/crud/route.utils';
import { Router } from "express";
const controller = new OrderController();
const router = Router();
mount(controller,orderRoutes,router,orderPipes);
export const orderRouter = router;