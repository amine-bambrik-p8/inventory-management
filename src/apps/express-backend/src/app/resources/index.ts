import { categoryRoute } from './category/category.router';
import { Application } from 'express';
import { clientRouter } from './client/client.router';
import { orderRouter } from './order/order.router';
import { productRouter } from './product/product.router';
import { productEntryRouter } from './product/product-entry.router';

import { supplierRouter } from './supplier/supplier.router';
import { userRouter } from './user/user.router';

export function setup (app: Application){
    app.use("/categories",categoryRoute);
    app.use("/clients",clientRouter);
    app.use("/orders",orderRouter);
    app.use("/products",productRouter);
    app.use("/products/:productId/entries",productEntryRouter);
    app.use("/suppliers",supplierRouter);
    app.use("/users",userRouter);
}