import { IContact } from './contact.interface';
import { IAddress } from './address.interface';

export interface ISupplier{
    readonly _id?: string;
    name: string;
    contact: IContact;
    picture?: string;
    address: IAddress;
}