import { regex } from './../../../utils/regex.utils';
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
        maxlength:regex.codebar.ean8.validLength,
        match:regex.codebar.ean8.validChars,
    },
    name: {
        type: String,
        required:true,
        maxlength:60,
        match:regex.alphanum,
    },
    mainEntryId: {
        type: Schema.Types.ObjectId,
    },
    quantityAlert:{
        type:{
            minQuantity: {
                type: Number,
                min:0
            },
            maxQuantity: {
                type: Number,
                min:0,
            },
        },
        validate:{
            validator(val){
                return (val.minQuantity && !val.maxQuantity) || (!val.minQuantity && val.maxQuantity) || (val.minQuantity && val.maxQuantity && val.maxQuantity > val.minQuantity);
            }
        }
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