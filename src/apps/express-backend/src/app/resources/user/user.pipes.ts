import { upload } from './../../utils/storage';
import { userValidation } from './validation/user.validation';
import { authorize } from '../../middleware/authorize.middleware';
import { Pipe } from '../../utils/pipe.type';
import { Role } from '@workspace/interfaces';
import { validate } from '../../middleware/validation.middleware';
export const userPipes = {
    createOne: [
        authorize(Role.ADMIN),
        validate(userValidation),
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
        validate(userValidation),
    ],
    setPicture:[
        upload
    ],
    removePicture:[]
}