import { userPipes } from './user.pipes';
import { UserController } from './controller/user.controller';
import { userRoutes } from './user.routes';
import { mount } from '../../utils/crud/route.utils';
import { Router } from "express";
const controller = new UserController();
const router = Router();
mount(controller,userRoutes,router,userPipes);
export const userRouter = router;