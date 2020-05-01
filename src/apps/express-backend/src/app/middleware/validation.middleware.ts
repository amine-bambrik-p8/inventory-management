import { Request,Response, NextFunction } from 'express';
export const validate = (joiSchema)=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        const {error,value} = joiSchema.validate(req.body.data);
        if(error){
            return next(error);
        }
        next();
    }
}