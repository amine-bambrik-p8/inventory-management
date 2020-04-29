import { OrderController } from './controller/order.controller';
import { orderRoutes } from './order.routes';
import { mount } from '../../utils/route.utils';
import { Router } from "express";
const controller = new OrderController();
const router = Router();
mount(controller,orderRoutes,router);
export const orderRouter = router;