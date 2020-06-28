import { IOrderEntry, IProduct } from '@workspace/interfaces';

export enum CartActionTypes {
    LOAD_CART = '[Cart] Load',
    CART_LOADED = '[Cart] Loaded',
    ADD_PRODUCT_TO_CART = '[Cart] Add Order Entry',
    DELETE_PRODUCT_FROM_CART = '[Cart] Remove Order Entry',
    SET_SELECTED_ORDER_ENTRY = '[Cart] Select Order Entry',
    UPDATE_ORDER_ENTRY = '[Cart] Update Order Entry',
    UNSET_SELECTED_ORDER_ENTRY = "[Cart] Unset Selected Order Entry",
    CLEAR_CART = "[Cart] Clear Cart"
}
export class AddProductToCart{
    readonly type = CartActionTypes.ADD_PRODUCT_TO_CART;
    constructor(public payload:IProduct){}
}

export class DeleteProductFromCart{
    readonly type = CartActionTypes.DELETE_PRODUCT_FROM_CART;
    constructor(public payload:string){}
}
export class SetSelectedOrderEntry{
    readonly type = CartActionTypes.SET_SELECTED_ORDER_ENTRY;
    constructor(public payload:string){}
}
export class UnsetSelectedOrderEntry{
    readonly type = CartActionTypes.UNSET_SELECTED_ORDER_ENTRY;
    constructor(){}
}

export class UpdateOrderEntry{
    readonly type = CartActionTypes.UPDATE_ORDER_ENTRY;
    constructor(public payload:IOrderEntry){}
}

export class ClearCart{
    readonly type = CartActionTypes.CLEAR_CART;
    constructor(){}
}

export type CartActions = AddProductToCart |
DeleteProductFromCart |
UpdateOrderEntry |
SetSelectedOrderEntry |
ClearCart|
UnsetSelectedOrderEntry;