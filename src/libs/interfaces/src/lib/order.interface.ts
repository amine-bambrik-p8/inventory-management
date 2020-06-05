import { IAddress } from './address.interface';
import { OrderStatus } from './order-status.enum';
import { IOrderEntry } from './order-entry.interface';
import { IClient } from './client.interface';
export interface IOrder {
    readonly _id?: string;
    readonly dateAndTimeOfOrder?: Date;
    orderStatus?: OrderStatus;
    address?: IAddress;
    entries: IOrderEntry[];
    client?: {
        id:string,
        name:string
    }|string;
}