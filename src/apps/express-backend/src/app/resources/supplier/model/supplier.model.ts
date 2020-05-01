import { regex } from './../../../utils/regex.utils';
import { Address } from '../../common/address.schema';
import { Schema, model,Document} from 'mongoose';
import { Contact } from './contact.schema';
import { ISupplier } from '@workspace/interfaces';
export interface ISupplierDocument extends Document,Omit<ISupplier,"_id">{

}
const schema = new Schema({
    name: {
        type: String,
        required:true,
        maxlength:60,
        match:regex.alphanum,
    },
    contact: {
        type: Contact,
        required:true,
    },
    picture: {
        type: String,
        maxlength:2000,
        match:regex.uri,
    },
    address: {
        type: Address,
        required:true,
    },
},
{

});

export const Supplier = model<ISupplierDocument>("supplier",schema);