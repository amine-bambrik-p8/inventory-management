import { clientValidation } from './validation/client.validation';
import { validate } from './../../middleware/validation.middleware';
import { authorize } from '../../middleware/authorize.middleware';
import { Role } from '@workspace/interfaces';
export const clientPipes = {
    createOne: [
        authorize(Role.ADMIN),
        validate(clientValidation),
    ],
    readOne:[
        
    ],
    readMany:[
        
    ],
    deleteOne:[       
        authorize(Role.ADMIN),
    ],
    updateOne:[
        authorize(Role.ADMIN),
        validate(clientValidation),
    ]
}