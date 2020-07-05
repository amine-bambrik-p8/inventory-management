import { IProductEntry } from './product-entry.interface';
import { IProduct } from './product.interface';
interface IProductSnapshot extends Omit<IProduct,"mainEntryId" | "entries">{
    entry:IProductEntry;
}
export interface IOrderEntry {
    readonly _id?: string
    quantity: number;
    readonly product?:IProductSnapshot; 
    productId:string;
}