import { IProduct } from '@workspace/interfaces';
import { Action } from '@ngrx/store';

export enum ProductsActionTypes{
    LOAD_PRODUCTS='[Products] Load',
    PRODUCTS_LOADED='[Products] Loaded',
    CREATE_PRODUCT='[Products] Create',
    PRODUCT_CREATED='[Products] Created',
    UPDATE_PRODUCT='[Products] Update',
    PRODUCT_UPDATED='[Products] Updated',
    DELETE_PRODUCT='[Products] Delete',
    PRODUCT_DELETED='[Products] Deleted',
    READ_PRODUCT='[Products] Read]',
    PRODUCT_READ='[Products] Read Done]',
}

export class LoadProducts implements Action{
    public readonly type = ProductsActionTypes.LOAD_PRODUCTS;
}

export class ProductsLoaded implements Action{
    public readonly type = ProductsActionTypes.PRODUCTS_LOADED;
    constructor(public payload: IProduct[]){}
}

export class CreateProduct implements Action{
    public readonly type = ProductsActionTypes.CREATE_PRODUCT;
    constructor(public payload: IProduct){}
}

export class ProductCreated implements Action{
    public readonly type = ProductsActionTypes.PRODUCT_CREATED;
    constructor(public payload: IProduct){}
}

export class UpdateProduct implements Action{
    public readonly type = ProductsActionTypes.UPDATE_PRODUCT;
    constructor(public payload: IProduct){}
}

export class ProductUpdated implements Action{
    public readonly type = ProductsActionTypes.PRODUCT_UPDATED;
    constructor(public payload: IProduct){}
}


export class DeleteProduct implements Action{
    public readonly type = ProductsActionTypes.DELETE_PRODUCT;
    constructor(public payload: IProduct){}
}

export class ProductDeleted implements Action{
    public readonly type = ProductsActionTypes.PRODUCT_DELETED;
    constructor(public payload: IProduct){}
}

export class ReadProduct implements Action{
    public readonly type = ProductsActionTypes.READ_PRODUCT;
    constructor(public payload: string){}
}

export class ProductRead implements Action{
    public readonly type = ProductsActionTypes.PRODUCT_READ;
    constructor(public payload: IProduct){}
}

export type ProductsActions = LoadProducts |
ProductsLoaded |
CreateProduct |
ProductCreated |
UpdateProduct |
ProductUpdated |
DeleteProduct |
ProductDeleted |
ReadProduct |
ProductRead