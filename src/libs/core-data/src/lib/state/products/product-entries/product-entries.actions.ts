import { IProductEntry } from '@workspace/interfaces';
import { Action } from '@ngrx/store';

export enum ProductEntriesActionTypes{
    LOAD_PRODUCT_ENTRIES='[ProductEntries] Load',
    PRODUCT_ENTRIES_LOADED='[ProductEntries] Loaded',
    CREATE_PRODUCT_ENTRY='[ProductEntries] Create',
    PRODUCT_ENTRY_CREATED='[ProductEntries] Created',
    UPDATE_PRODUCT_ENTRY='[ProductEntries] Update',
    PRODUCT_ENTRY_UPDATED='[ProductEntries] Updated',
    DELETE_PRODUCT_ENTRY='[ProductEntries] Delete',
    PRODUCT_ENTRY_DELETED='[ProductEntries] Deleted',
    READ_PRODUCT_ENTRY='[ProductEntries] Read]',
    PRODUCT_ENTRY_READ='[ProductEntries] Read Done]',
}

export class LoadProductEntries implements Action{
    public readonly type = ProductEntriesActionTypes.LOAD_PRODUCT_ENTRIES;
}

export class ProductEntriesLoaded implements Action{
    public readonly type = ProductEntriesActionTypes.PRODUCT_ENTRIES_LOADED;
    constructor(public payload: IProductEntry[]){}
}

export class CreateProductEntry implements Action{
    public readonly type = ProductEntriesActionTypes.CREATE_PRODUCT_ENTRY;
    constructor(public payload: IProductEntry){}
}

export class ProductEntryCreated implements Action{
    public readonly type = ProductEntriesActionTypes.PRODUCT_ENTRY_CREATED;
    constructor(public payload: IProductEntry){}
}

export class UpdateProductEntry implements Action{
    public readonly type = ProductEntriesActionTypes.UPDATE_PRODUCT_ENTRY;
    constructor(public payload: IProductEntry){}
}

export class ProductEntryUpdated implements Action{
    public readonly type = ProductEntriesActionTypes.PRODUCT_ENTRY_UPDATED;
    constructor(public payload: IProductEntry){}
}


export class DeleteProductEntry implements Action{
    public readonly type = ProductEntriesActionTypes.DELETE_PRODUCT_ENTRY;
    constructor(public payload: IProductEntry){}
}

export class ProductEntryDeleted implements Action{
    public readonly type = ProductEntriesActionTypes.PRODUCT_ENTRY_DELETED;
    constructor(public payload: IProductEntry){}
}

export class ReadProductEntry implements Action{
    public readonly type = ProductEntriesActionTypes.READ_PRODUCT_ENTRY;
    constructor(public payload: IProductEntry){}
}

export class ProductEntryRead implements Action{
    public readonly type = ProductEntriesActionTypes.PRODUCT_ENTRY_READ;
    constructor(public payload: IProductEntry){}
}

export type ProductEntriesActions = LoadProductEntries |
ProductEntriesLoaded |
CreateProductEntry |
ProductEntryCreated |
UpdateProductEntry |
ProductEntryUpdated |
DeleteProductEntry |
ProductEntryDeleted |
ReadProductEntry |
ProductEntryRead