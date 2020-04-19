import * as mongoose from "mongoose";
import { Schema, model} from 'mongoose';

const schema = new Schema({
    dateOfManufacturing: {
        type: Date,
    },
    dateOfExpiration: {
        type: Date,
    },
    checkedInQuantity: {
        type: Number,
    },
    boughtPrice: {
        type: Number,
    },
    price: {
        type: Number,
    },
    discount: {
        type: Number,
    },
    soldQuantity: {
        type: Number,
    },
},
{
    toJSON: {
        virtuals: true,
    },
});

schema.virtual("quantity").get(function (){
    return this.checkedInQuantity - this.soldQuantity;
});

export const ProductEntry = schema;