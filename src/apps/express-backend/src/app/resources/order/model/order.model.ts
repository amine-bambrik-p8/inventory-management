import { OrderEntry } from './order-entry.schema';
import { Address } from '../../common/address.schema';
import { orderStatus } from './order-status';
import { Schema, model,Document} from 'mongoose';
import { IOrder,OrderStatus, } from '@workspace/interfaces';
import { Client } from '../../client/model/client.model';
import { makeSuffixes } from '../../../utils/utils/makeSuffixes';
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
    },
    _keys:{
        type:[String]
    }
},
{
    toJSON:{
        transform(doc,ret){
            delete ret._keys;
        },
        virtuals:true
    }
});
schema.pre("save",async function (){
    const order = this as any
    if(order.client)
        (order as any)._keys =makeSuffixes([order.client.name]);
});
schema.index({"client.name":"text"},{name:"Order Index"});
schema.pre("save",async function (){
    const order = this as IOrderDocument;
    if(!order.client) return;
    const clientId = order.client.id;
    if(clientId){
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