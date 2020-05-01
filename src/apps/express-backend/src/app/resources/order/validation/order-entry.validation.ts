import { IOrderEntry } from '@workspace/interfaces';
import * as Joi from '@hapi/joi';

export const orderEntryValidation =  Joi.object<IOrderEntry>({
    productId:Joi.string()
                .hex()
                .required()
                .length(24),
    quantity:Joi.number()
                .required()
                .custom(function(value,helpers){
                    if(value<=0){
                        return helpers.error("must be greater than 0");
                    }
                    return value;
                }),
});