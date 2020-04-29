import { Category } from '../model/category.model';
import { CRUDController } from '../../../utils/crud.controller';
export class CategoryController extends CRUDController{
    constructor(){
        super(Category);
    }
}