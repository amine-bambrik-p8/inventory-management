import { ValidationError, ValidationErrorItem } from '@hapi/joi';
import { AppError } from '../utils/errors/app-error';

export function handleJoiValidationError(error: ValidationError){
    return new AppError(400,
        Object.values(error.details)
            .map((propertyError:ValidationErrorItem)=>{
                return propertyError.message
            }).join("\n"),
        );
}