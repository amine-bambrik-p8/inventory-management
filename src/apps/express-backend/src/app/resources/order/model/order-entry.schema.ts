import { Product, IProductDocument } from './../../product/model/product.model';
import { ProductEntry } from '../../product/model/product-entry.schema';
import { Schema } from 'mongoose';
const productSchema:IProductDocument = Product.schema.obj;
const {mainEntryId,entries,thumbnails,description,quantityAlert,...productSnapshot} = {...productSchema,entry:{type:ProductEntry,required:true}};
const schema = new Schema({
    quantity: {
        type: Number,
        required:true,
        validate:{
            validator(val){
                return val>0;   
            }
        }
    },
    product:{
        type: productSnapshot,
        required:true,
    },
},
{

});
schema.virtual("productId").get(function (){
    return this.product._id;
});
export const OrderEntry = schema;