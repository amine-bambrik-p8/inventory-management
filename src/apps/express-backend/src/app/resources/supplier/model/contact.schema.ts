import { regex } from './../../../utils/regex.utils';
import { Schema } from 'mongoose';

const schema = new Schema({
    firstName: {
        type: String,
        required:true,
        maxlength:60,
        match:regex.name,
    },
    lastName: {
        type: String,
        required:true,
        maxlength:60,
        match:regex.name,
    },
    
    phoneNumber: {
        type: String,
        required:true,
        match:regex.phone,
    },
    email: {
        type: String,
        required:true,
        maxlength:321,
        match:regex.email,
    },
},
{

});

export const Contact = schema;