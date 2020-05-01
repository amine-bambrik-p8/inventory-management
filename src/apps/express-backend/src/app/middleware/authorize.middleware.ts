import { Request, Response, NextFunction } from 'express';
export const authorize = (...roles:string[])=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        if(!(req as any).user && roles.indexOf((req as any).user.role)<0){
            res.status(403);
            res.json({
                error:{
                    message:"403 - Forbidden"
                }
            })
            return;
        }
        next();
    }
}   