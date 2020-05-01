import { supplierValidation } from './validation/supplier.validation';
import { validate } from './../../middleware/validation.middleware';
import { authorize } from '../../middleware/authorize.middleware';
import { Role } from '@workspace/interfaces';
export const supplierPipes = {
    createOne: [
        authorize(Role.INVENTORY,Role.ADMIN),
        validate(supplierValidation),
    ],
    readOne:[
        
    ],
    readMany:[
        
    ],
    deleteOne:[       
        authorize(Role.INVENTORY,Role.ADMIN),
    ],
    updateOne:[
        authorize(Role.INVENTORY,Role.ADMIN),
        validate(supplierValidation)
    ]
}