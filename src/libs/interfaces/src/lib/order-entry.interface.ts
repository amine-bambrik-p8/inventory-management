import { IProductEntry } from './product-entry.interface';
import { IProduct } from './product.interface';

export interface IOrderEntry {
    readonly _id?: string
    quantity: number;
    readonly productEntry?: IProductEntry;
    productId:string;
}