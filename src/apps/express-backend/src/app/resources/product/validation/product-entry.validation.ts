import { IProductEntry } from '@workspace/interfaces';
import * as Joi from '@hapi/joi';

export const prodcutEntryValidation = Joi.object<IProductEntry>({
    quantityInfo:Joi.object({
        checkedInQuantity:Joi.number()
                            .custom((value,helpers)=>{
                                if(value<=0){
                                    return helpers.error("checkedInQuantity must be greater then 0");
                                }
                                return value
                            }),
    }).required(),
    boughtPrice:Joi.number()
                    .min(0)
                    .required(),
    dates:Joi.object({
        dateOfManufacturing: Joi.date()
                                .required(),
        dateOfExpiration: Joi.date()
                            .required()
    }).custom((value,helpers)=>{
        
        if(value && value.dateOfManufacturing<value.dateOfExpiration){
            return helpers.error("dateOfManufacturing must be less than dateOfExpiration");
        }
        return value;
    }),
    discount:Joi.number()
                .min(0)
                .max(1),
    price:Joi.number()
            .min(0)
            .required(),

});