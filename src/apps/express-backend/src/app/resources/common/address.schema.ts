import { Schema } from 'mongoose';

const schema = new Schema({
    city: {
        type: String,
        required:true,
        maxlength:60,
    },
    address: {
        type: String,
        required:true,
        maxlength:60
    },
    zip: {
        type: String,
        required:true,
        maxlength:12
    }
},
{

});

export const Address = schema;