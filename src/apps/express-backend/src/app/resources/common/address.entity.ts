import * as mongoose from "mongoose";
import { Schema, model} from 'mongoose';

const schema = new Schema({
    city: {
        type: String,
    },
    address: {
        type: String,
    },
    zip: {
        type: String,
    }
},
{

});

export const Address = schema;