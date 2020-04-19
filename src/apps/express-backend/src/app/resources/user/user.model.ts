import { roles } from './role';
import * as mongoose from "mongoose";
import { Schema, model} from 'mongoose';

const schema = new Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    role: {
        type: String,
        enum: [ ...roles ]
    }
},
{

});

export const User = model("user",schema);