import { ISupplier } from '@workspace/interfaces';
import { Action } from '@ngrx/store';

export enum SuppliersActionTypes{
    LOAD_SUPPLIERS='[Suppliers] Load',
    SUPPLIERS_LOADED='[Suppliers] Loaded',
    CREATE_SUPPLIER='[Suppliers] Create',
    SUPPLIER_CREATED='[Suppliers] Created',
    UPDATE_SUPPLIER='[Suppliers] Update',
    SUPPLIER_UPDATED='[Suppliers] Updated',
    DELETE_SUPPLIER='[Suppliers] Delete',
    SUPPLIER_DELETED='[Suppliers] Deleted',
    READ_SUPPLIER='[Suppliers] Read]',
    SUPPLIER_READ='[Suppliers] Read Done]',
}

export class LoadSuppliers implements Action{
    public readonly type = SuppliersActionTypes.LOAD_SUPPLIERS;
}

export class SuppliersLoaded implements Action{
    public readonly type = SuppliersActionTypes.SUPPLIERS_LOADED;
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

export class UpdateSupplier implements Action{
    public readonly type = SuppliersActionTypes.UPDATE_SUPPLIER;
    constructor(public payload: ISupplier){}
}

export class SupplierUpdated implements Action{
    public readonly type = SuppliersActionTypes.SUPPLIER_UPDATED;
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

export class ReadSupplier implements Action{
    public readonly type = SuppliersActionTypes.READ_SUPPLIER;
    constructor(public payload: string){}
}

export class SupplierRead implements Action{
    public readonly type = SuppliersActionTypes.SUPPLIER_READ;
    constructor(public payload: ISupplier){}
}

export type SuppliersActions = LoadSuppliers |
SuppliersLoaded |
CreateSupplier |
SupplierCreated |
UpdateSupplier |
SupplierUpdated |
DeleteSupplier |
SupplierDeleted |
ReadSupplier |
SupplierRead