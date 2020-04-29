import { Address } from '../../common/address.schema';
import { Schema, model,Document} from 'mongoose';
import { IClient } from '@workspace/interfaces';
export interface IClientDocument extends Document,Omit<IClient,"_id">{

}
const schema = new Schema({
    firstName: {
        type: String,
        required:true,
        maxlength:60
    },
    lastName: {
        type: String,
        required:true,
        maxlength:60,
    },
    phoneNumber: {
        type: String,
        required:true,
        maxlength:10
    },
    email: {
        type: String,
        required:true,
        unique:true,
        maxlength:321
    },
    address: {
        type: Address,
        required:true,
    },
    dateOfSubscription: {
        type: Date,
        default:Date.now
    },
    picture: {
        type: String,
        maxlength:2000
    }
},
{

});

export const Client = model<IClientDocument>("client",schema);