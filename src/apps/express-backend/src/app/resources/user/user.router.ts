import { UserController } from './controller/user.controller';
import { userRoutes } from './user.routes';
import { mount } from '../../utils/route.utils';
import { Router } from "express";
const controller = new UserController();
const router = Router();
mount(controller,userRoutes,router);
export const userRouter = router;