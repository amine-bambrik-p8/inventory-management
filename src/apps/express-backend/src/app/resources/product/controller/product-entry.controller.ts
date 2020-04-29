import { Product, IProductDocument } from './../model/product.model';
import { IProductEntry } from '@workspace/interfaces';
import { Request,Response,NextFunction } from 'express';
import { Document } from 'mongoose';
export class ProductEntryController {
    async createOne(req: Partial<Request>,res: Partial<Response>,next?:NextFunction){
        const productEntry: IProductEntry = req.body.data;
        const productId: string = req.params.productId;
        let product: IProductDocument;
        try {
            product = await Product.findByIdAndUpdate(productId,{
                $push:{
                    entries:productEntry,
                },
            },{
                new:true,
            });
            if(!product){
                res.status(400);
                res.json({
                    error:{
                        message:"400 - Bad Request"
                    },
                });
                return;
            }
        } catch (error) {
            next(error);
            return;
        }
        res.status(201);
        res.json({
            data:product
        });
    }
    async deleteOne(req: Partial<Request>,res: Partial<Response>,next?:NextFunction){
        const productEntryId: string = req.params.id;
        const productId: string = req.params.productId;
        const product: IProductDocument = await Product.findById(productId);
        if(!product){
            res.status(404);
            res.json({
                error:{
                    message:"404 - Not Found"
                }
            });
            return;
        }
        const productEntry:Document = (product.entries as any).id(productEntryId);
        if(!productEntry){
             res.status(404);
             res.json({
                error:{
                    message:"404 - Not Found"
                },
             });
             return;
        }
        productEntry.remove();
        const result = await product.save();
        res.status(200);
        res.json({
            data:result
        });
    }
    async updateOne(req: Partial<Request>,res: Partial<Response>,next?:NextFunction){
        const productId: string = req.params.productId;
        const productEntryId: string = req.params.id;
        const productEntry: IProductEntry = req.body.data;
        const updateObj:Partial<IProductEntry> = {};
        for(const key in productEntry){
            updateObj[`entries.$.${key}`] = productEntry[key];
        }
        const product:IProductDocument = await Product.findOneAndUpdate({
            _id:productId,
            entries:{
                $elemMatch:{
                    _id:productEntryId,
                }
            }
        },{
            $set:{
                ...updateObj
            },
        },{
            new:true,         
        });
        if(!product){
            res.status(404);
            res.json({
                error:{
                    message:"404 - Not Found",
                }
            });
            return;
        }
        res.status(200);
        res.json({
            data:product
        });
    }
}