import { IAddress } from './address.interface';
export interface IClient{
    readonly _id?: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    readonly dateOfSubscription?: Date;
    picture?: string;
    address:IAddress
}