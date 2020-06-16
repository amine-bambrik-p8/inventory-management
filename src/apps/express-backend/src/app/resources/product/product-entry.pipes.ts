import { prodcutEntryValidation } from './validation/product-entry.validation';
import { validate } from './../../middleware/validation.middleware';
import { orderValidation } from './../order/validation/order.validation';
import { Role } from '@workspace/interfaces';
import { authorize } from './../../middleware/authorize.middleware';
export const productEntryPipes = {
    createOne:[
        validate(prodcutEntryValidation),
        authorize(Role.INVENTORY,Role.ADMIN),
    ],
    updateOne:[
        validate(prodcutEntryValidation),
        authorize(Role.INVENTORY,Role.ADMIN),
    ],
    setMainEntry:[
        authorize(Role.INVENTORY,Role.ADMIN),
    ],
    deleteOne:[
        authorize(Role.INVENTORY,Role.ADMIN),
    ],
}