import { regex } from './../../../utils/regex.utils';
import { ICategory } from '@workspace/interfaces';
import * as Joi from "@hapi/joi";
export const categoryValidation  = Joi.object<ICategory>({
    name:Joi.string()
            .regex(regex.alphanum)
            .required()
            .max(60),
});