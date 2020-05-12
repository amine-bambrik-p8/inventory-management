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
    categoryId: string;
    supplierId: string;
    thumbnails?: [{
        readonly _id?: string;
        path:string;
    }],
    description?:string
}