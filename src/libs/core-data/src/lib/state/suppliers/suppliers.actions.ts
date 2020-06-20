import { ISupplier } from '@workspace/interfaces';
import { Action } from '@ngrx/store';

export enum SuppliersActionTypes{
    LOAD_SUPPLIERS='[Suppliers] Load',
    SUPPLIERS_LOADED='[Suppliers] Loaded',
    SUPPLIERS_LOAD_FAIL='[Suppliers] Load Fail',
    CREATE_SUPPLIER='[Suppliers] Create',
    SUPPLIER_CREATED='[Suppliers] Created',
    SUPPLIER_CREATE_FAIL='[Suppliers] Create Fail',
    UPDATE_SUPPLIER='[Suppliers] Update',
    SUPPLIER_UPDATED='[Suppliers] Updated',
    SUPPLIER_UPDATE_FAIL='[Suppliers] Update Fail',
    DELETE_SUPPLIER='[Suppliers] Delete',
    SUPPLIER_DELETED='[Suppliers] Deleted',
    SUPPLIER_DELETE_FAIL='[Suppliers] Delete Fail',
    READ_SUPPLIER='[Suppliers] Read]',
    SUPPLIER_READ='[Suppliers] Read Done]',
    SUPPLIER_READ_FAIL='[Suppliers] Read Fail]',
}

export class LoadSuppliers implements Action{
    public readonly type = SuppliersActionTypes.LOAD_SUPPLIERS;
}

export class SuppliersLoaded implements Action{
    public readonly type = SuppliersActionTypes.SUPPLIERS_LOADED;
    constructor(public payload: ISupplier[]){}
}
export class SuppliersLoadFail implements Action{
    public readonly type = SuppliersActionTypes.SUPPLIERS_LOAD_FAIL;
    constructor(public payload: ISupplier[]){}
}

export class CreateSupplier implements Action{
    public readonly type = SuppliersActionTypes.CREATE_SUPPLIER;
    constructor(public payload: ISupplier){}
}

export class SupplierCreated implements Action{
    public readonly type = SuppliersActionTypes.SUPPLIER_CREATED;
    constructor(public payload: ISupplier){}
}
export class SupplierCreateFail implements Action{
    public readonly type = SuppliersActionTypes.SUPPLIER_CREATE_FAIL;
    constructor(public payload: ISupplier){}
}

export class UpdateSupplier implements Action{
    public readonly type = SuppliersActionTypes.UPDATE_SUPPLIER;
    constructor(public payload: ISupplier){}
}

export class SupplierUpdated implements Action{
    public readonly type = SuppliersActionTypes.SUPPLIER_UPDATED;
    constructor(public payload: ISupplier){}
}
export class SupplierUpdateFail implements Action{
    public readonly type = SuppliersActionTypes.SUPPLIER_UPDATE_FAIL;
    constructor(public payload: ISupplier){}
}


export class DeleteSupplier implements Action{
    public readonly type = SuppliersActionTypes.DELETE_SUPPLIER;
    constructor(public payload: ISupplier){}
}

export class SupplierDeleted implements Action{
    public readonly type = SuppliersActionTypes.SUPPLIER_DELETED;
    constructor(public payload: ISupplier){}
}
export class SupplierDeleteFail implements Action{
    public readonly type = SuppliersActionTypes.SUPPLIER_DELETE_FAIL;
    constructor(public payload: ISupplier){}
}

export class ReadSupplier implements Action{
    public readonly type = SuppliersActionTypes.READ_SUPPLIER;
    constructor(public payload: string){}
}

export class SupplierRead implements Action{
    public readonly type = SuppliersActionTypes.SUPPLIER_READ;
    constructor(public payload: ISupplier){}
}

export class SupplierReadFail implements Action{
    public readonly type = SuppliersActionTypes.SUPPLIER_READ_FAIL;
    constructor(public payload: ISupplier){}
}

export const isActionTypeFail = (action:SuppliersActions):boolean => {
    return action.type === SuppliersActionTypes.SUPPLIERS_LOAD_FAIL
        || action.type === SuppliersActionTypes.SUPPLIER_UPDATE_FAIL
        || action.type === SuppliersActionTypes.SUPPLIER_DELETE_FAIL
        || action.type === SuppliersActionTypes.SUPPLIER_CREATE_FAIL
        || action.type === SuppliersActionTypes.SUPPLIER_READ_FAIL
}
export const isActionTypeSuccess = (action:SuppliersActions):boolean => {
    return action.type === SuppliersActionTypes.SUPPLIERS_LOADED
        || action.type === SuppliersActionTypes.SUPPLIER_UPDATED
        || action.type === SuppliersActionTypes.SUPPLIER_DELETED
        || action.type === SuppliersActionTypes.SUPPLIER_CREATED
        || action.type === SuppliersActionTypes.SUPPLIER_READ
}

export type SuppliersActions = LoadSuppliers |
SuppliersLoaded |
SuppliersLoadFail |
CreateSupplier |
SupplierCreated |
SupplierCreateFail |
UpdateSupplier |
SupplierUpdated |
SupplierUpdateFail |
DeleteSupplier |
SupplierDeleted |
SupplierDeleteFail |
ReadSupplier |
SupplierRead |
SupplierReadFail