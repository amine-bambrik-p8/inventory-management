import { regex } from './../../../utils/regex.utils';
import { ISupplier } from '@workspace/interfaces';
import * as Joi from '@hapi/joi';
import { addressValidation } from '../../common/address.validation';
import { contactValidation } from './contact.validation';

export const supplierValidation = Joi.object<ISupplier>({
    address: addressValidation.required(),
    contact:contactValidation.required(),
    name:Joi.string()
            .regex(regex.alphanum)
            .max(60)
            .required(),
    
});