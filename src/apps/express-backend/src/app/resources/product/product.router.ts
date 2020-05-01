import { productPipes } from './product.pipes';
import { ProductController } from './controller/product.controller';
import { productRoutes } from './product.routes';
import { mount } from '../../utils/crud/route.utils';
import { Router } from "express";
const controller = new ProductController();
const router = Router();
mount(controller,productRoutes,router,productPipes);
export const productRouter = router;