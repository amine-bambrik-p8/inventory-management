import { addressValidation } from './../../common/address.validation';
import { IClient } from '@workspace/interfaces';
import * as Joi from "@hapi/joi"
import { regex } from '../../../utils/regex.utils';

export const clientValidation = Joi.object<IClient>({
    firstName:Joi.string()
                .regex(regex.name)
                .max(60)
                .required(),
    lastName: Joi.string()
                .regex(regex.name)
                .max(60)
                .required(),
    phoneNumber:Joi.string()
                    .regex(regex.phone)
                    .required(),
    email:Joi.string()
            .email()
            .required()
            .max(321),
    address:addressValidation.required(),
});