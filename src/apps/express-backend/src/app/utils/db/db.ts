import * as mongoose from "mongoose";

export async function connect(url,options={}){
    return await mongoose.connect(url,{...options,useNewUrlParser:true})
}