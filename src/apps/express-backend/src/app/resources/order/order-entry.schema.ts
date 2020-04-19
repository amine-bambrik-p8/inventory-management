import * as mongoose from "mongoose";
import { Schema, model} from 'mongoose';

const schema = new Schema({
    quantity: {
        type: Number,
    },
    productEntry:{
        type: Schema.Types.ObjectId,
    }
},
{

});

export const OrderEntry = schema;