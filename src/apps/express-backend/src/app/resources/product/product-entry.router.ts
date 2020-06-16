import { ProductEntryController } from './controller/product-entry.controller';
import { productEntryRoutes } from './product-entry.routes';
import { productEntryPipes } from './product-entry.pipes';
import { mount } from '../../utils/crud/route.utils';
import { Router } from "express";
const controller = new ProductEntryController();
const router = Router({mergeParams: true});
mount(controller,productEntryRoutes,router,productEntryPipes);
export const productEntryRouter = router;