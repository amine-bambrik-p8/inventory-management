import { Client } from './../client/client.model';
import { OrderEntry } from './order-entry.entity';
import { Address } from './../common/address.entity';
import { orderStatus } from './order-status';
import * as mongoose from "mongoose";
import { Schema, model} from 'mongoose';

const schema = new Schema({
    dateAndTimeOfOrder: {
        type: Date,
    },
    orderStatus: {
        type: String,
        enum: [ ...orderStatus ]
    },
    address: {
        type: Address,
    },
    entries: {
        type: [ OrderEntry ]
    },
    clientId: {
        type: Schema.Types.ObjectId,
        ref: "client"
    }
},
{

});

export const Order = model("order",schema);