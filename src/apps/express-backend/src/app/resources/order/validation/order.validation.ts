import { orderStatus } from './../model/order-status';
import { orderEntryValidation } from './order-entry.validation';
import { addressValidation } from './../../common/address.validation';
import { IOrder } from '@workspace/interfaces';
import * as Joi from '@hapi/joi';


export const orderValidation = Joi.object<IOrder>({
    address:addressValidation,
    clientId:Joi.string()
                .hex()
                .length(24),
    entries:Joi.array()
                .required()
                .items(orderEntryValidation)
                .min(1),
    orderStatus:Joi.string()
                    .equal(...orderStatus),

});