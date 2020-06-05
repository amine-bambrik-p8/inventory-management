import { prodcutEntryValidation } from './product-entry.validation';
import { regex } from './../../../utils/regex.utils';
import { IProduct } from '@workspace/interfaces';
import * as Joi from '@hapi/joi';

export const productValidation = Joi.object<IProduct>({
    category:Joi.string()
    .hex()
    .length(24)
    .required(),
    codebar:Joi.string()
                .regex(regex.codebar.ean8.validChars)
                .length(regex.codebar.ean8.validLength),
    quantityAlert:Joi.object({
        minQuantity:Joi.number(),
        maxQuantity:Joi.number(),
    }).custom((value,helpers)=>{
        if(value && !value.minQuantity && !value.maxQuantity){
            return helpers.error("either minQuantity or maxQuantity should exist");
        }
        if(value && value.minQuantity>value.maxQuantity){
            return helpers.error("min quantity can't be greater than the max quantity");
        }
        return value;
    }),
    name:Joi.string()
            .regex(regex.alphanum)
            .required(),
    supplier:Joi.string()
    .hex()
    .length(24)
    .required(),
    description:Joi.string()
                    .max(500)
    
});