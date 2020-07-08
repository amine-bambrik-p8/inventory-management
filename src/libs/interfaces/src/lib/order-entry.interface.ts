import { IProduct } from './product.interface';
import { IProductEntry } from '@workspace/interfaces';

export interface IProductSnapshot extends Exclude<IProduct,"mainEntryId"|"entries"|"thumbnails"|"description"|"quantityAlert">{
    entry:IProductEntry;
}
export interface IOrderEntry {
    readonly _id?: string
    quantity: number;
    readonly product?:IProductSnapshot; 
    productId?:string;
}