import { Product } from '../model/product.model';
import { CRUDController } from '../../../utils/crud.controller';
export class ProductController extends CRUDController{
    constructor(){
        super(Product);
    }
}