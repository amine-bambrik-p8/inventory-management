import { ProductEntry } from '../../product/model/product-entry.schema';
import { Schema } from 'mongoose';

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
    productEntry:{
        type: ProductEntry,
        required:true,
    },
},
{

});

export const OrderEntry = schema;