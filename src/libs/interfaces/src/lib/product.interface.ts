import { IProductEntry } from './product-entry.interface';
import { ICategory } from './category.interface';
import { ISupplier } from './supplier.interface';

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
    readonly thumbnails?: [{
        readonly _id?: string;
        path:string;
    }],
    description?:string
}