import { regex } from './../../../utils/regex.utils';
import { Address } from '../../common/address.schema';
import { Schema, model,Document} from 'mongoose';
import { Contact } from './contact.schema';
import { ISupplier } from '@workspace/interfaces';
import { makeSuffixes } from '../../../utils/utils/makeSuffixes';
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
    _keys:{
        type:[String]
    }
},
{
    toJSON:{
        transform(doc,ret){
            delete ret._keys;
        }
    }
});
schema.pre("save",async function (){
    const supplier = this as any
    supplier._keys =makeSuffixes([supplier.contact.firstName,supplier.contact.lastName,supplier.name])
});
export const Supplier = model<ISupplierDocument>("supplier",schema);