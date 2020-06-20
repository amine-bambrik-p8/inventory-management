import { IProduct } from '@workspace/interfaces';
import { Action } from '@ngrx/store';

export enum ProductsActionTypes{
    LOAD_PRODUCTS='[Products] Load',
    PRODUCTS_LOADED='[Products] Loaded',
    PRODUCTS_LOAD_FAIL='[Products] Load Fail',
    CREATE_PRODUCT='[Products] Create',
    PRODUCT_CREATED='[Products] Created',
    PRODUCT_CREATE_FAIL='[Products] Create Fail',
    UPDATE_PRODUCT='[Products] Update',
    PRODUCT_UPDATED='[Products] Updated',
    PRODUCT_UPDATE_FAIL='[Products] Update Fail',
    DELETE_PRODUCT='[Products] Delete',
    PRODUCT_DELETED='[Products] Deleted',
    PRODUCT_DELETE_FAIL='[Products] Delete Fail',
    READ_PRODUCT='[Products] Read]',
    PRODUCT_READ='[Products] Read Done]',
    PRODUCT_READ_FAIL='[Products] Read Fail]',
}

export class LoadProducts implements Action{
    public readonly type = ProductsActionTypes.LOAD_PRODUCTS;
}

export class ProductsLoaded implements Action{
    public readonly type = ProductsActionTypes.PRODUCTS_LOADED;
    constructor(public payload: IProduct[]){}
}
export class ProductsLoadFail implements Action{
    public readonly type = ProductsActionTypes.PRODUCTS_LOAD_FAIL;
    constructor(public payload: any){}
}

export class CreateProduct implements Action{
    public readonly type = ProductsActionTypes.CREATE_PRODUCT;
    constructor(public payload: IProduct){}
}

export class ProductCreated implements Action{
    public readonly type = ProductsActionTypes.PRODUCT_CREATED;
    constructor(public payload: IProduct){}
}
export class ProductCreateFail implements Action{
    public readonly type = ProductsActionTypes.PRODUCT_CREATE_FAIL;
    constructor(public payload: any){}
}

export class UpdateProduct implements Action{
    public readonly type = ProductsActionTypes.UPDATE_PRODUCT;
    constructor(public payload: IProduct){}
}

export class ProductUpdated implements Action{
    public readonly type = ProductsActionTypes.PRODUCT_UPDATED;
    constructor(public payload: IProduct){}
}
export class ProductUpdateFail implements Action{
    public readonly type = ProductsActionTypes.PRODUCT_UPDATE_FAIL;
    constructor(public payload: any){}
}


export class DeleteProduct implements Action{
    public readonly type = ProductsActionTypes.DELETE_PRODUCT;
    constructor(public payload: IProduct){}
}

export class ProductDeleted implements Action{
    public readonly type = ProductsActionTypes.PRODUCT_DELETED;
    constructor(public payload: IProduct){}
}
export class ProductDeleteFail implements Action{
    public readonly type = ProductsActionTypes.PRODUCT_DELETE_FAIL;
    constructor(public payload: any){}
}

export class ReadProduct implements Action{
    public readonly type = ProductsActionTypes.READ_PRODUCT;
    constructor(public payload: string){}
}

export class ProductRead implements Action{
    public readonly type = ProductsActionTypes.PRODUCT_READ;
    constructor(public payload: IProduct){}
}

export class ProductReadFail implements Action{
    public readonly type = ProductsActionTypes.PRODUCT_READ_FAIL;
    constructor(public payload: any){}
}

export const isActionTypeFail = (action:ProductsActions):boolean => {
    return action.type === ProductsActionTypes.PRODUCTS_LOAD_FAIL
        || action.type === ProductsActionTypes.PRODUCT_UPDATE_FAIL
        || action.type === ProductsActionTypes.PRODUCT_DELETE_FAIL
        || action.type === ProductsActionTypes.PRODUCT_CREATE_FAIL
        || action.type === ProductsActionTypes.PRODUCT_READ_FAIL
}
export const isActionTypeSuccess = (action:ProductsActions):boolean => {
    return action.type === ProductsActionTypes.PRODUCTS_LOADED
        || action.type === ProductsActionTypes.PRODUCT_UPDATED
        || action.type === ProductsActionTypes.PRODUCT_DELETED
        || action.type === ProductsActionTypes.PRODUCT_CREATED
        || action.type === ProductsActionTypes.PRODUCT_READ
}

export type ProductsActions = LoadProducts |
ProductsLoaded |
ProductsLoadFail |
CreateProduct |
ProductCreated |
ProductCreateFail |
UpdateProduct |
ProductUpdated |
ProductUpdateFail |
DeleteProduct |
ProductDeleted |
ProductDeleteFail |
ReadProduct |
ProductRead |
ProductReadFail