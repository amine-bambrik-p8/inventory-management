import { regex } from './../../utils/regex.utils';
import * as Joi from "@hapi/joi";
import { IAddress } from '@workspace/interfaces';

export const addressValidation = Joi.object<IAddress>({
    address:Joi.string()
                .regex(regex.address)
                .max(60)
                .required(),
    city:Joi.string()
            .regex(regex.address)
            .required()
            .max(60),
    zip: Joi.string()
            .regex(regex.zip)
            .required()
            .max(12),
});