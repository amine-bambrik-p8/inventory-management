import { regex } from './../../utils/regex.utils';
import { Schema } from 'mongoose';

const schema = new Schema({
    city: {
        type: String,
        required:true,
        maxlength:60,
        match:regex.address,
    },
    address: {
        type: String,
        required:true,
        maxlength:60,
        match:regex.address,
    },
    zip: {
        type: String,
        required:true,
        maxlength:12,
        match:regex.zip
    }
},
{

});

export const Address = schema;