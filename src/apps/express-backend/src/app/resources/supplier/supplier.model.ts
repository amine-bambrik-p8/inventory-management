import { Address } from './../common/address.entity';
import * as mongoose from "mongoose";
import { Schema, model} from 'mongoose';

const schema = new Schema({
    name: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    picture: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    email: {
        type: String,
    },
    address: {
        type: Address,
    },
},
{

});

export const Supplier = model("supplier",schema);