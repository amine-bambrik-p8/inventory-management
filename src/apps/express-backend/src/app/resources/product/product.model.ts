import * as mongoose from "mongoose";
import { Schema, model} from 'mongoose';
import { ProductEntry } from './product-entry.entity';

const schema = new Schema({
    codebar: {
        type: String,
    },
    name: {
        type: String,
    },
    mainEntry: {
        type: Schema.Types.ObjectId,
    },
    minQuantity: {
        type: Number,
    },
    maxQuantity: {
        type: Number,
    },
    entries: {
        type: [ProductEntry],
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "category",
    },
    supplier: {
        type: Schema.Types.ObjectId,
        ref: "supplier",
    },
},
{

});

export const Product = model("product",schema);