import { regex } from './../../../utils/regex.utils';
import { IUser } from '@workspace/interfaces';
import * as Joi from '@hapi/joi';
import { roles } from '../model/role';
export const userValidation = Joi.object<IUser>({
    firstName:Joi.string()
                .required()
                .regex(regex.name)
                .max(60),
    lastName:Joi.string()
                .required()
                .regex(regex.name)
                .max(60),
    password:Joi.string()
                .regex(regex.password)
                .min(8)
                .max(32),
    role:Joi.string()
            .required()
            .equal(...roles),
    username:Joi.string()
                .regex(regex.username)
                .required()
                .min(5)
                .max(32),
});