import { categoryPipes } from './category.pipes';
import { CategoryController } from './controller/category.controller';
import { categoryRoutes } from './category.routes';
import { mount } from '../../utils/crud/route.utils';
import { Router } from "express";
const controller = new CategoryController();
const router = Router();
mount(controller,categoryRoutes,router,categoryPipes);
export const categoryRoute = router;
