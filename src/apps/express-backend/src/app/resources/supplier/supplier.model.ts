import { Address } from './../common/address.entity';
import * as mongoose from "mongoose";
import { Schema, model} from 'mongoose';
import { Contact } from './contact.schema';

const schema = new Schema({
    name: {
        type: String,
    },
    contact: {
        type: Contact
    },
    picture: {
        type: String,
    },
    address: {
        type: Address,
    },
},
{

});

export const Supplier = model("supplier",schema);