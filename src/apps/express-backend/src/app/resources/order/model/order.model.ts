import { OrderEntry } from './order-entry.schema';
import { Address } from '../../common/address.schema';
import { orderStatus } from './order-status';
import { Schema, model,Document} from 'mongoose';
import { IOrder,OrderStatus, } from '@workspace/interfaces';
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
    clientId: {
        type: Schema.Types.ObjectId,
        ref: "client"
    }
},
{

});

export const Order = model<IOrderDocument>("order",schema);