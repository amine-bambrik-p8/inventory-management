import { IProductEntry } from './product-entry.interface';
import { Unit } from './unit.enum';


export interface IProduct{
    readonly _id?:string;
    codebar?: string;
    name: string;
    readonly mainEntryId?: string;
    quantityAlert?:{
        minQuantity?: Number;
        maxQuantity?: Number;
    },
    entries?: IProductEntry[];
    category:{
        id:string,
        name?:string,
    },
    supplier: {
        id:string,
        name?:string,
    },
    unit?:Unit,
    readonly thumbnails?: [{
        readonly _id?: string;
        path:string;
    }],
    description?:string
}