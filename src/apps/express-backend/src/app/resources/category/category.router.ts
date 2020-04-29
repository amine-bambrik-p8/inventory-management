import { CategoryController } from './controller/category.controller';
import { categoryRoutes } from './category.routes';
import { mount } from '../../utils/route.utils';
import { Router } from "express";
const controller = new CategoryController();
const router = Router();
mount(controller,categoryRoutes,router);
export const categoryRoute = router;
