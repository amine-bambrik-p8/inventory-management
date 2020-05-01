import { ProductEntryController } from './controller/product-entry.controller';
import { productEntryRoutes } from './product-entry.routes';
import { mount } from '../../utils/crud/route.utils';
import { Router } from "express";
const controller = new ProductEntryController();
const router = Router();
mount(controller,productEntryRoutes,router);
export const productRouter = router;