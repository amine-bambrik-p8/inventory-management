import * as mongoose from "mongoose";
import { Schema, model} from 'mongoose';

const schema = new Schema({
    name: {
        type: String,
    }
},
{

});

export const Category = model("category",schema);