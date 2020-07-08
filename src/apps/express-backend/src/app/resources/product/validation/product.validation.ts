import { regex } from './../../../utils/regex.utils';
import { IProduct, units } from '@workspace/interfaces';
import * as Joi from '@hapi/joi';

export const productValidation = Joi.object<IProduct>({
    category:Joi.object({
        id:Joi.string()
        .hex()
        .length(24)
        .required(),
        name:Joi.string()
    }).required(),
    codebar:Joi.string()
                .regex(regex.codebar.ean12.validChars)
                .length(regex.codebar.ean12.validLength),
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
    unit:Joi.string()
            .equal(...units),
    name:Joi.string()
            .regex(regex.alphanum)
            .required(),
    supplier:Joi.object({
        id:Joi.string()
        .hex()
        .length(24)
        .required(),
        name:Joi.string()
    }).required(),
    description:Joi.string()
                    .max(500)
    
});