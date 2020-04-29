import { SupplierController } from './controller/supplier.controller';
import { supplierRoutes } from './supplier.routes';
import { mount } from '../../utils/route.utils';
import { Router } from "express";
const controller = new SupplierController();
const router = Router();
mount(controller,supplierRoutes,router);
export const supplierRouter = router;