import { Supplier } from './../../supplier/model/supplier.model';
import { Category } from './../../category/model/category.model';
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
    category: {
        type:{
            id:{
                type:Schema.Types.ObjectId,
                ref:"category",
                required:true,
            },
            name:{
                type:String,        
                required:true,
                maxlength:60,
                match:regex.alphanum,
            }
        },
        required:true,
    },
    supplier: {
        type:{
            id:{
                type:Schema.Types.ObjectId,
                ref:"supplier",
                required:true,
            },
            name:{
                type:String,        
                required:true,
                maxlength:60,
                match:regex.alphanum,
            }
        },
        required:true,
    },
    thumbnails: {
        type: [{
            path:{
             type:String
            }
        }],
    },
    description: {
        type: String,
        maxlength:500,
    }
},
{

});
schema.index({ codebar: 'text',name:'text',"category.name":'text',"supplier.name":'text' }, {name: 'Product index'});
schema.pre("save",async function (){
    const product:IProductDocument = this as IProductDocument; 
    const categoryId:string = product.category.id;
    const supplierId:string = product.supplier.id;
    if(categoryId){
        const category = await Category.findById(categoryId);
        if(!category){
            throw Error("No such category is defind")
        }
        product.category={
            name:category.name,
            id: categoryId,
        }
    }
    if(supplierId){
        const supplier = await Supplier.findById(supplierId);
        if(!supplier){
            throw new Error("No such supplier is defind");
        }
        product.supplier={
            name:supplier.name,
            id:supplierId,
        }
    }
})
export const Product = model<IProductDocument>("product",schema);