import { Schema, model} from 'mongoose';

const schema = new Schema({
    firstName: {
        type: String,
        required:true,
        maxlength:60,
    },
    lastName: {
        type: String,
        required:true,
        maxlength:60,
    },
    
    phoneNumber: {
        type: String,
        required:true,
        maxlength:10
    },
    email: {
        type: String,
        required:true,
        maxlength:321
    },
},
{

});

export const Contact = schema;