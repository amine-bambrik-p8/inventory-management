import { regex } from './../../../utils/regex.utils';
import { ICategory } from '@workspace/interfaces';
import { Schema, model,Document} from 'mongoose';
import { makeSuffixes } from '../../../utils/utils/makeSuffixes';
export interface ICategoryDocument extends Document,Omit<ICategory,"_id">{
    
}
const schema = new Schema({
    name: {
        type: String,
        unique:true,
        required:true,
        maxlength:60,
        match:regex.alphanum,
    },
    _keys:{
        type:[String]
    }
},
{
    toJSON:{
        transform(doc,ret){
            delete ret._keys;
        }
    }
});
//schema.index({name:"text"},{name:"Category Index"});
schema.pre("save",async function (){
    const category = this as any
    (category as any)._keys =makeSuffixes([category.name])
});
export const Category = model<ICategoryDocument>("category",schema);