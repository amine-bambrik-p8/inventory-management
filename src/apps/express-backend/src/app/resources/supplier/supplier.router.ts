import { supplierPipes } from './supplier.pipes';
import { SupplierController } from './controller/supplier.controller';
import { supplierRoutes } from './supplier.routes';
import { mount } from '../../utils/crud/route.utils';
import { Router } from "express";
const controller = new SupplierController();
const router = Router();
mount(controller,supplierRoutes,router,supplierPipes);
export const supplierRouter = router;