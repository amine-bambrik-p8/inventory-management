import { OrderEntry } from './order-entry.schema';
import { Address } from '../../common/address.schema';
import { orderStatus } from './order-status';
import { Schema, model,Document} from 'mongoose';
import { IOrder,OrderStatus, } from '@workspace/interfaces';
import { Client } from '../../client/model/client.model';
export interface IOrderDocument extends Document,Omit<IOrder,"_id">{

}
const schema = new Schema({
    dateAndTimeOfOrder: {
        type: Date,
        default:Date.now
    },
    orderStatus: {
        type: String,
        enum: [ ...orderStatus ],
        required:true,
        default:OrderStatus.DELIVERED
    },
    
    address: {
        type: Address,
    },
    entries: {
        type: [ OrderEntry ],
        required: true,
        validate:{
            validator(val){
                return val.length>0;
            },
            message:"An order must include at least one product",
        }
    },
    client: {
        type:{
            id:{
                type: Schema.Types.ObjectId,
                ref: "client",
                required:true,
            },
            name:{
                type:String,
                required:true,
                maxlength:120
            }
        },
    }
},
{

});
schema.index({"client.name":"text"},{name:"Order Index"});
schema.pre("validate",async function (){
    const order = this as IOrderDocument;
    const clientId = order.client as string;
    if(clientId && typeof clientId === "string"){
        const client = await Client.findById(clientId);
        if(!client){
            throw new Error("No such client is defined");
        }
        order.client={
            id:clientId,
            name:`${client.firstName} ${client.lastName}`
        }
    }
})
export const Order = model<IOrderDocument>("order",schema);