import { removeFile } from './../../../utils/storage/index';
import { NextFunction,  Response, Request  } from 'express';
import { Product } from '../model/product.model';
import { CRUDController } from '../../../utils/crud/controller/crud.controller';
export class ProductController extends CRUDController{
    constructor(){
        super(Product);
    }
    async addThumbnail(req,res:Response,next:NextFunction){
        const {file,params:{id}} = req;
        try {
            const product = await Product.findByIdAndUpdate(id,{
                $push:{
                    thumbnails:{
                        path: (file.path as string),
                    }
                }
            },{
                new:true,
            });
            if(!product){
                res.status(400);
                res.json({
                    error:{
                        message:"400 - Bad Request",
                    },
                });
                return;
            }
            
            res.status(200);
            res.json({
                data:product,
            });
        } catch (error) {
            next(error);
        }
    }
    async removeThumbnail(req:Partial<Request>,res:Partial<Response>,next:NextFunction){
        const productId = req.params.productId;
        const photoId = req.params.id;
        try {
            const product = await Product.findByIdAndUpdate(productId,{
                $pull:{
                    "thumbnails._id":photoId
                }
            });
            if(!product){
                res.status(400);
                res.json({
                    error:{
                        message:"400 - Bad Request",
                    },
                });
                return;
            }
            const file = (product.thumbnails as any).id(photoId);
            await removeFile(file.path);
            res.status(200);
            res.json({
                data:product
            });
        } catch (error) {
            next(error);
        }
    }
}