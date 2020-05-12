import { removeFile } from './../../../utils/storage/index';
import { NextFunction, Response, Request } from 'express';
import { CRUDController } from '../../../utils/crud/controller/crud.controller';
import { User } from '../model/user.model';
export class UserController extends CRUDController{
    constructor(){
        super(User);
    }
    async setPicture(req,res:Partial<Response>,next:NextFunction){
        const {file,params:{id}} = req;
        try {
            const user = await User.findByIdAndUpdate(id,{
                $set:{
                    picture:file.path
                },
            },{
                new:true,
            });
            if(!user){
                res.status(400);
                res.json({
                    error:{
                        message: '400 - Bad Request',
                    },
                });
                return;
            }
            res.status(200);
            res.json({
                data:user
            });
        } catch (error) {
            next(error);
        }
    }
    async removePicture(req: Partial<Request>,res: Partial<Response>,next: NextFunction){
        const id = req.params.id;
        try {
            const user = await User.findById(id);
            if(!user){
                res.status(400);
                res.json({
                    error:{
                        message:"400 - Bad Request",
                    },
                });
                return;
            }
            await removeFile(user.picture)
            await user.update({
                $unset:{
                    picture:"",
                }
            },{
                new:true,
            });
            res.status(200);
            res.json({
                data:user
            });
        } catch (error) {
            next(error);
        }
    }
}