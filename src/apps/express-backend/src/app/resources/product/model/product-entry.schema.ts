import { IProductEntry } from '@workspace/interfaces';
import { Schema,Document} from 'mongoose';
export interface IProductEntryDocument extends Document,Omit<IProductEntry,"_id">{

}
const schema = new Schema({
    dates:{
        type:{
            dateOfManufacturing: {
                type: Date,
                required:true,
            },
            dateOfExpiration: {
                type: Date,
                required:true,
            },
        },
        validate:{
            validator(val){
                return val.dateOfManufacturing < val.dateOfExpiration;
            }
        },
    },
    boughtPrice: {
        type: Number,
        required:true,
        min:0,
    },
    price: {
        type: Number,
        required:true,
        min:0,
    },
    discount: {
        type: Number,
        default:0,
        min:0,
        max:1,
    },
    quantityInfo:{
        type:{      
            checkedInQuantity: {
                type: Number,
                min:1,
                required:true,
            },
            soldQuantity: {
                type: Number,
                default:0,
                validate:{
                    validator:(val)=>{
                        return val>0;
                    }
                }
            },
        },
        required:true,
        validate:{
            validator:function (val){
                if(val.checkedInQuantity && val.soldQuantity)
                    return val.checkedInQuantity>val.soldQuantity;
                return true;
            },
            message:"Checkedin quantity must be greater than sold quantity"
        }
    },
    
},
{
    toJSON: {
        virtuals: true,
    },
});

schema.virtual("quantity").get(function (){
    
    const  obj = this.quantityInfo || this;
    return obj.checkedInQuantity - obj.soldQuantity;
});

export const ProductEntry = schema;