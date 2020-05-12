import { removeFile } from './../../../utils/storage/index';
import { NextFunction, Response, Request } from 'express';
import { Supplier } from '../model/supplier.model';
import { CRUDController } from '../../../utils/crud/controller/crud.controller';
export class SupplierController extends CRUDController{
    constructor(){
        super(Supplier);
    }
    async setPicture(req,res:Partial<Response>,next:NextFunction){
        const {file,params:{id}} = req;
        try {
            const supplier = await Supplier.findByIdAndUpdate(id,{
                $set:{
                    picture:file.path,
                }
            },{
                new:true,
            });
            if(!supplier){
                res.status(400);
                res.json({
                    error:{
                        message:"400 - Bad Request",
                    }
                });
                return;
            }
            res.status(200);
            res.json({
                data:supplier,
            });
        } catch (error) {
            next(error);
        }
    }
    async removePicture(req:Partial<Request>,res:Partial<Response>,next:NextFunction){
        const id = req.params.id;
        try {
            const supplier = await Supplier.findById(id);
            if(!supplier){
                res.status(400);
                res.json({
                    error:{
                        message: "400 - Bad Request",
                    },
                });
                return;
            }
            await removeFile(supplier.picture);
            await supplier.update({
                $unset:{
                    picture:"",
                },
            },{
                new:true,
            });

            res.status(200);
            res.json({
                data:supplier,
            });
        } catch (error) {
            next(error);
        }
    }
}