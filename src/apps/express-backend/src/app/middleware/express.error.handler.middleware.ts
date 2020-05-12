import { AppError } from '../utils/errors/app-error';
import { Request, Response, NextFunction } from 'express';
import { handleMongooseValidationError, handleMongooseCastError, handleMongooseDuplicateFieldError } from './mongoose.error.handler.middleware';
import {handleJoiValidationError} from './joi.error.handler.middleware';
import {Error as MongooseError} from 'mongoose';
import { ValidationError } from '@hapi/joi';
function sendDevelopmentError(err: AppError, res: Partial<Response>){
    res.status(err.statusCode).json({
        error:{
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        }
    });
};
  
function sendProductionError(err:AppError, res:Partial<Response>){
    if (err.isOperational) {
        res.status(err.statusCode).json({
            error:{
                message: err.message,
                status: err.status,
            }
        });
    } else {
        console.error('ERROR 💥: ', err);
        res.status(500).json({
            error:{
                status: 'error',
                message: 'Something went wrong!'
            }
        });
    }
}
export function handleError(err: AppError,req:Partial<Request>,res:Partial<Response>,next:NextFunction){
    err.statusCode = err.statusCode || 500;
    err.status = err.message || "500 - Internal error"
    
    switch (process.env.NODE_ENV) {
        case "production":
            let error:any = {...err};
            if(error instanceof MongooseError.CastError)
                error = handleMongooseCastError(error);
            else if(error.code === 11000)
                error = handleMongooseDuplicateFieldError(error);
            else if(err instanceof MongooseError.ValidationError)
                error = handleMongooseValidationError(error);
            else if(err.name === "ValidationError")
                error = handleJoiValidationError(error as ValidationError);
            sendProductionError(error,res);
            break;
        case "development":
            sendDevelopmentError(err,res)
            break
    }
}