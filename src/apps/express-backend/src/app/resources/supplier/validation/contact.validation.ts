import { regex } from './../../../utils/regex.utils';
import * as Joi from '@hapi/joi';
import { IContact } from '@workspace/interfaces';

export const contactValidation = Joi.object<IContact>({
    firstName:Joi.string()
                .required()
                .regex(regex.name)
                .max(60),
    lastName:Joi.string()
                .required()
                .regex(regex.name)
                .max(60),
    email:Joi.string()
            .email()
            .required()
            .max(321),
    phoneNumber:Joi.string()
                    .regex(regex.phone)
                    .required(),
});