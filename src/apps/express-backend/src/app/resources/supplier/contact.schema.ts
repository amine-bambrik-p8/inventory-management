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
},
{

});

export const Contact = schema;