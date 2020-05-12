import { removeFile } from './../../../utils/storage/index';
import { Client } from '../model/client.model';
import { CRUDController } from '../../../utils/crud/controller/crud.controller';
import { Request,Response,NextFunction} from 'express';
export class ClientController extends CRUDController{
    constructor(){
        super(Client);
    }
    async setPicture(req,res:Partial<Response>,next?:NextFunction){
        const {file,params:{id}} = req;
        try {
            const client = await Client.findByIdAndUpdate(id,{
                $set:{
                    picture:file.path
                }
            },{
                new:true
            });
            if(!client){
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
                data:file.path
            });
        } catch (error) {
            next(error);
        }
    }
    async removePicture(req:Partial<Request>,res:Partial<Response>,next:NextFunction){
        const id = req.params.id;
        try {
            let client = await Client.findById(id);
            if(client){
                res.status(400);
                res.json({
                    error:{
                        message:"400 - Bad Request",
                    },
                });
                return;
            }
            await removeFile(client.picture);
            client = await client.update({
                $unset:{
                    picture:''
                },
            },{
                new:true,
            });
            
            res.status(200);
            res.json({
                data:client,
            });
        } catch (error) {
            next(error);
        }
    }
}