import { regex } from './../../../utils/regex.utils';
import { environment } from '../../../../environments/environment';
import { roles } from './role';
import { Schema, model,Document} from 'mongoose';
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { IUser } from '@workspace/interfaces';
export interface IUserDocument extends Document,Omit<IUser,"_id">{
    jwtToken:string;
    isVaidPassword:(password)=>Promise<Boolean>;
}
const schema = new Schema({
    username: {
        type: String,
        required:true,
        unique:true,
        maxlength:16,
        match:regex.username,
    },
    password: {
        type: String,
        required:true,
    },
    firstName: {
        type: String,
        required:true,
        maxlength:60,
        match:regex.name,
    },
    lastName: {
        type: String,
        required:true,
        maxlength:60,
        match:regex.name
    },
    role: {
        type: String,
        enum: [ ...roles ],
        required:true,
    },
    picture:{
        type:String,
    }
},
{
    
toJSON:{
    transform(doc,ret){
        delete ret.password;
    }
},
});
schema.pre("save",async function(next){
if(!this.isModified("password")){
    return next();
}
try {
    (this as any).password = await bcrypt.hash((this as any).password,8);
} catch (error) {
    next(error);
}
});
schema.virtual("jwtToken").get(function(){
return jwt.sign({_id:this._id,role:this.role},environment.jwt.secret,environment.jwt.options);
});
schema.statics.isValidToken = async (token)=>{
try {
    return await jwt.verify(token,environment.jwt.secret);
    
} catch (error) {
    return false;
}
};
schema.methods.isValidPassword = async function (password){
try {
    return await bcrypt.compare(password,this.password);
} catch (error) {
    return false;
}
};

export const User = model<IUserDocument>("user",schema);