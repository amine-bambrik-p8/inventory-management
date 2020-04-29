import { CRUDController } from '../../../utils/crud.controller';
import { User } from '../model/user.model';
export class UserController extends CRUDController{
    constructor(){
        super(User);
    }
}