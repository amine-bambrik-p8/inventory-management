import { IProductEntry, IProduct } from '@workspace/interfaces';
import { Action } from '@ngrx/store';

export enum ProductEntriesActionTypes {
    LOAD_PRODUCT_ENTRIES = '[ProductEntries] Load',
    PRODUCT_ENTRIES_LOADED = '[ProductEntries] Loaded',
    PRODUCT_ENTRIES_LOAD_FAIL = '[ProductEntries] Load Fail',
    CREATE_PRODUCT_ENTRY = '[ProductEntries] Create',
    PRODUCT_ENTRY_CREATED = '[ProductEntries] Created',
    PRODUCT_ENTRY_CREATE_FAIL = '[ProductEntries] Create Fail',
    UPDATE_PRODUCT_ENTRY = '[ProductEntries] Update',
    PRODUCT_ENTRY_UPDATED = '[ProductEntries] Updated',
    PRODUCT_ENTRY_UPDATE_FAIL = '[ProductEntries] Update Fail',
    DELETE_PRODUCT_ENTRY = '[ProductEntries] Delete',
    PRODUCT_ENTRY_DELETED = '[ProductEntries] Deleted',
    PRODUCT_ENTRY_DELETE_FAIL = '[ProductEntries] Delete Fail',
    READ_PRODUCT_ENTRY = '[ProductEntries] Read]',
    SET_PRODUCT_MAIN_ENTRY = "[ProductEntries] Set Product Main Entry",
    PRODUCT_MAIN_ENTRY_FAILED_TO_BE_SET = "[ProductEntries] Product Main Entry Failed To Be Set",
    PRODUCT_MAIN_ENTRY_SET = "[ProductEntries] Product Main Entry Set",
}

export class LoadProductEntries implements Action{
    public readonly type = ProductEntriesActionTypes.LOAD_PRODUCT_ENTRIES;
    constructor(public id:string){}
}

export class ProductEntriesLoaded implements Action{
    public readonly type = ProductEntriesActionTypes.PRODUCT_ENTRIES_LOADED;
    constructor(public id:string,public payload: IProduct){}
}
export class ProductEntriesLoadFail implements Action{
    public readonly type = ProductEntriesActionTypes.PRODUCT_ENTRIES_LOAD_FAIL;
    constructor(public id:string,public payload: any){}
}

export class CreateProductEntry implements Action{
    public readonly type = ProductEntriesActionTypes.CREATE_PRODUCT_ENTRY;
    constructor(public id:string,public payload: IProductEntry){}
}

export class ProductEntryCreated implements Action{
    public readonly type = ProductEntriesActionTypes.PRODUCT_ENTRY_CREATED;
    constructor(public id:string,public payload: IProduct){}
}
export class ProductEntryCreateFail implements Action{
    public readonly type = ProductEntriesActionTypes.PRODUCT_ENTRY_CREATE_FAIL;
    constructor(public id:string,public payload: any){}
}

export class UpdateProductEntry implements Action{
    public readonly type = ProductEntriesActionTypes.UPDATE_PRODUCT_ENTRY;
    constructor(public id:string,public payload: IProductEntry){}
}

export class ProductEntryUpdated implements Action{
    public readonly type = ProductEntriesActionTypes.PRODUCT_ENTRY_UPDATED;
    constructor(public id:string,public payload: IProduct){}
}
export class ProductEntryUpdateFail implements Action{
    public readonly type = ProductEntriesActionTypes.PRODUCT_ENTRY_UPDATE_FAIL;
    constructor(public id:string,public payload: any){}
}


export class DeleteProductEntry implements Action{
    public readonly type = ProductEntriesActionTypes.DELETE_PRODUCT_ENTRY;
    constructor(public id:string,public payload: IProductEntry){}
}

export class ProductEntryDeleted implements Action{
    public readonly type = ProductEntriesActionTypes.PRODUCT_ENTRY_DELETED;
    constructor(public id:string,public payload: IProduct){}
}
export class ProductEntryDeleteFail implements Action{
    public readonly type = ProductEntriesActionTypes.PRODUCT_ENTRY_DELETE_FAIL;
    constructor(public id:string,public payload: any){}
}

export class SetProductMainEntry implements Action{
    public readonly type = ProductEntriesActionTypes.SET_PRODUCT_MAIN_ENTRY;
    constructor(public id:string,public payload:IProductEntry){}
}
export class ProductMainEntrySet implements Action{
    public readonly type = ProductEntriesActionTypes.PRODUCT_MAIN_ENTRY_SET;
    constructor(public id:string,public payload:IProduct){}
}
export class ProductMainEntryFailedToBeSet implements Action{
    public readonly type = ProductEntriesActionTypes.PRODUCT_MAIN_ENTRY_FAILED_TO_BE_SET;
    constructor(public id:string,public payload:IProductEntry){}
}

export const isActionTypeFail = (action:ProductEntriesActions):boolean => {
    return action.type === ProductEntriesActionTypes.PRODUCT_ENTRIES_LOAD_FAIL
        || action.type === ProductEntriesActionTypes.PRODUCT_ENTRY_UPDATE_FAIL
        || action.type === ProductEntriesActionTypes.PRODUCT_ENTRY_DELETE_FAIL
        || action.type === ProductEntriesActionTypes.PRODUCT_ENTRY_CREATE_FAIL
        || action.type === ProductEntriesActionTypes.PRODUCT_MAIN_ENTRY_FAILED_TO_BE_SET
}
export const isActionTypeSuccess = (action:ProductEntriesActions):boolean => {
    return action.type === ProductEntriesActionTypes.PRODUCT_ENTRIES_LOADED
        || action.type === ProductEntriesActionTypes.PRODUCT_ENTRY_UPDATED
        || action.type === ProductEntriesActionTypes.PRODUCT_ENTRY_DELETED
        || action.type === ProductEntriesActionTypes.PRODUCT_ENTRY_CREATED
        || action.type === ProductEntriesActionTypes.PRODUCT_MAIN_ENTRY_SET
}

export type ProductEntriesActions = LoadProductEntries |
ProductEntriesLoaded |
ProductEntriesLoadFail |
CreateProductEntry |
ProductEntryCreated |
ProductEntryCreateFail |
UpdateProductEntry |
ProductEntryUpdated |
ProductEntryUpdateFail |
DeleteProductEntry |
ProductEntryDeleted |
ProductEntryDeleteFail |
ProductMainEntrySet |
ProductMainEntryFailedToBeSet |
SetProductMainEntry;