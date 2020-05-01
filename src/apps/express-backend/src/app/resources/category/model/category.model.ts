import { regex } from './../../../utils/regex.utils';
import { ICategory } from '@workspace/interfaces';
import { Schema, model,Document} from 'mongoose';
export interface ICategoryDocument extends Document,Omit<ICategory,"_id">{
    
}
const schema = new Schema({
    name: {
        type: String,
        unique:true,
        required:true,
        maxlength:60,
        match:regex.alphanum,
    }
},
{

});

export const Category = model<ICategoryDocument>("category",schema);