import { Client } from '../model/client.model';
import { CRUDController } from '../../../utils/crud.controller';
export class ClientController extends CRUDController{
    constructor(){
        super(Client);
    }
}