import { Address } from './../common/address.entity';
import * as mongoose from "mongoose";
import { Schema, model} from 'mongoose';

const schema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
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
    dateOfSubscription: {
        type: Date,
    },
    picture: {
        type: String,
    }
},
{

});

export const Client = model("client",schema);