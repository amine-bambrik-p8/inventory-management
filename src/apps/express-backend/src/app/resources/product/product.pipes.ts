import { productValidation } from './validation/product.validation';
import { authorize } from '../../middleware/authorize.middleware';
import { Role } from '@workspace/interfaces';
import { validate } from '../../middleware/validation.middleware';
import { upload } from '../../utils/storage';
export const productPipes = {
    createOne: [
        authorize(Role.INVENTORY,Role.ADMIN),
        validate(productValidation),
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
        validate(productValidation),
    ],
    addThumbnail:[
        upload
    ],
    removeThumbnail:[]
}