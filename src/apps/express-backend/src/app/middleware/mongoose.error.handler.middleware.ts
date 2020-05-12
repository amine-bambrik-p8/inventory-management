import { ValidationError, ValidationErrorItem } from '@hapi/joi';
import { AppError } from '../utils/errors/app-error';
import { Response, Request, NextFunction } from 'express';
import { Error } from "mongoose"
import {Error as MongooseError} from 'mongoose';

export function handleMongooseValidationError(error: Error.ValidationError){
    return new AppError(400,
        Object.values(error.errors)
            .map((propertyError: Error.ValidatorError)=>{
                return propertyError.message
            }).join("\n"),
        );
}
export function handleMongooseCastError(error: MongooseError.CastError){
    const message = `Invalid ${error.path}: ${error.value}`;
    return new AppError(400,message);
}
export function handleMongooseDuplicateFieldError(error: any){
    const value = error.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
    const message = `Duplicate field value: ${value}. Please use anothe value!`;
    return new AppError(400,message);
}

