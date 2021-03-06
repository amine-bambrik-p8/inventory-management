import { IProductDocument } from './../../product/model/product.model';
import { Product } from '../../product/model/product.model';
import { IOrder, IProduct } from '@workspace/interfaces';
import { Request, Response, NextFunction } from 'express';
import { Order } from '../model/order.model';
import { CRUDController } from '../../../utils/crud/controller/crud.controller';
import * as mongoose from "mongoose";
export class OrderController extends CRUDController{
    constructor(){
        super(Order);
    }
    async createOne(req:Partial<Request>,res:Partial<Response>,next?:NextFunction){
        const order:IOrder = req.body.data;
        (await Order.createCollection());
        const session = await mongoose.startSession();
        let result;
        try {
            session.startTransaction();
            order.entries = await Promise.all(
                order.entries.map(async (orderEntry:any)=>{
                    const product:IProductDocument= await Product.findById(orderEntry.productId);
                    if(!product){
                        throw {status:404,message:"404 - Not Found"};
                    }
                    const productEntry = (product.entries as any).id(product.mainEntryId);
                    if(!productEntry){
                        throw {status:404,message:"404 - Not Found"};
                    }
                    await Product.findOneAndUpdate({
                        _id:orderEntry.productId,
                        entries:{
                            $elemMatch:{
                                _id:product.mainEntryId,
                            }
                        }
                    },{
                        $inc:{
                            "entries.$.quantityInfo.soldQuantity":orderEntry.quantity,
                        }
                    });
                    const {mainEntryId,entries,...productSnapshot} = {...(product.toJSON() as IProduct),entry:productEntry};
                    orderEntry.product=productSnapshot;
                    delete orderEntry.productId;
                    return orderEntry;
                })
            );
            result =  await Order.create([order],{session});
            await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();
            next(error);
            return;
        }
        res.status(201);
        res.json({
            data:result.pop()
        });
    }
}