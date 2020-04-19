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

});

export const ProductEntry = schema;