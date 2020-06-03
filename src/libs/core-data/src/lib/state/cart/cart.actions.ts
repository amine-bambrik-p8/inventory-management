import { IOrderEntry } from '@workspace/interfaces';

export enum CartActionTypes{
    LOAD_CART='[Cart] Load',
    CART_LOADED='[Cart] Loaded',
    ADD_ORDER_ENTRY = '[Cart] Add Order Entry',
    DELETE_ORDER_ENTRY = '[Cart] Remove Order Entry',
    SELECT_ORDER_ENTRY = '[Cart] Select Order Entry',
    UPDATE_ORDER_ENTRY = '[Cart] Update Order Entry'
}
export class AddOrderEntry{
    readonly type = CartActionTypes.ADD_ORDER_ENTRY;
    constructor(public payload:IOrderEntry){}
}

export class DeleteOrderEntry{
    readonly type = CartActionTypes.DELETE_ORDER_ENTRY;
    constructor(public payload:IOrderEntry){}
}
export class SelectOrderEntry{
    readonly type = CartActionTypes.SELECT_ORDER_ENTRY;
    constructor(public payload:IOrderEntry){}
}

export class UpdateOrderEntry{
    readonly type = CartActionTypes.UPDATE_ORDER_ENTRY;
    constructor(public payload:IOrderEntry){}
}


export type CartActions = AddOrderEntry |
DeleteOrderEntry |
UpdateOrderEntry |
SelectOrderEntry;