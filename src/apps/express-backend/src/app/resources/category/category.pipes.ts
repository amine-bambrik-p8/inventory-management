import { categoryValidation } from './validation/category.validation';
import { authorize } from './../../middleware/authorize.middleware';
import { Role } from '@workspace/interfaces';
import { validate } from '../../middleware/validation.middleware';
export const categoryPipes = {
    createOne: [
        authorize(Role.INVENTORY,Role.ADMIN),
        validate(categoryValidation)
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
        validate(categoryValidation)
    ]
}