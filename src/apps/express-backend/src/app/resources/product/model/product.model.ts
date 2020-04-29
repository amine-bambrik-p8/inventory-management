import * as mongoose from "mongoose";
import { Schema, model,Document} from 'mongoose';
import { ProductEntry } from './product-entry.schema';
import { IProduct } from '@workspace/interfaces';
export interface IProductDocument extends Document,Omit<IProduct,"_id">{

}
const schema = new Schema({
    codebar: {
        type: String,
        unique:true,
        maxlength:128
    },
    name: {
        type: String,
        required:true,
        maxlength:60
    },
    mainEntryId: {
        type: Schema.Types.ObjectId,
    },
    minQuantity: {
        type: Number,
        min:0
    },
    maxQuantity: {
        type: Number,
    },
    entries: {
        type: [ProductEntry],
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "category",
        required:true,
    },
    supplierId: {
        type: Schema.Types.ObjectId,
        ref: "supplier",
        required:true,
    },
    thumbnails: {
        type: [String],
    },
    description: {
        type: String,
        maxlength:500,
    }
},
{

});

export const Product = model<IProductDocument>("product",schema);