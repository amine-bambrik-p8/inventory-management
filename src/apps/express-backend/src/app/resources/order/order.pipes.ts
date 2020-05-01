import { orderValidation } from './validation/order.validation';
import { validate } from './../../middleware/validation.middleware';
import { authorize } from '../../middleware/authorize.middleware';
import { Pipe } from '../../utils/pipe.type';
import { Role } from '@workspace/interfaces';
export const orderPipes = {
    createOne: [
        validate(orderValidation),
    ],
    readOne:[
        authorize(Role.ADMIN),
    ],
    readMany:[
        authorize(Role.ADMIN),
    ],
    deleteOne:[       
        authorize(Role.ADMIN),
    ],
    updateOne:[
        authorize(Role.ADMIN),
        validate(orderValidation),
    ]
}