import { ProductController } from './controller/product.controller';
import { productRoutes } from './product.routes';
import { mount } from '../../utils/route.utils';
import { Router } from "express";
const controller = new ProductController();
const router = Router();
mount(controller,productRoutes,router);
export const productRouter = router;