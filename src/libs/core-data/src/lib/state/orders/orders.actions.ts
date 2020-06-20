import { IOrder } from '@workspace/interfaces';
import { Action } from '@ngrx/store';

export enum OrdersActionTypes{
    LOAD_ORDERS='[Orders] Load',
    ORDERS_LOADED='[Orders] Loaded',
    ORDERS_LOAD_FAIL='[Orders] Load Fail',
    CREATE_ORDER='[Orders] Create',
    ORDER_CREATED='[Orders] Created',
    ORDER_CREATE_FAIL='[Orders] Create Fail',
    UPDATE_ORDER='[Orders] Update',
    ORDER_UPDATED='[Orders] Updated',
    ORDER_UPDATE_FAIL='[Orders] Update Fail',
    DELETE_ORDER='[Orders] Delete',
    ORDER_DELETED='[Orders] Deleted',
    ORDER_DELETE_FAIL='[Orders] Delete Fail',
    READ_ORDER='[Orders] Read]',
    ORDER_READ='[Orders] Read Done]',
    ORDER_READ_FAIL='[Orders] Read Fail]',
}

export class LoadOrders implements Action{
    public readonly type = OrdersActionTypes.LOAD_ORDERS;
}

export class OrdersLoaded implements Action{
    public readonly type = OrdersActionTypes.ORDERS_LOADED;
    constructor(public payload: IOrder[]){}
}
export class OrdersLoadFail implements Action{
    public readonly type = OrdersActionTypes.ORDERS_LOAD_FAIL;
    constructor(public payload: any){}
}

export class CreateOrder implements Action{
    public readonly type = OrdersActionTypes.CREATE_ORDER;
    constructor(public payload: IOrder){}
}

export class OrderCreated implements Action{
    public readonly type = OrdersActionTypes.ORDER_CREATED;
    constructor(public payload: IOrder){}
}

export class OrderCreateFail implements Action{
    public readonly type = OrdersActionTypes.ORDER_CREATE_FAIL;
    constructor(public payload: any){}
}

export class UpdateOrder implements Action{
    public readonly type = OrdersActionTypes.UPDATE_ORDER;
    constructor(public payload: IOrder){}
}

export class OrderUpdated implements Action{
    public readonly type = OrdersActionTypes.ORDER_UPDATED;
    constructor(public payload: IOrder){}
}
export class OrderUpdateFail implements Action{
    public readonly type = OrdersActionTypes.ORDER_UPDATE_FAIL;
    constructor(public payload: any){}
}


export class DeleteOrder implements Action{
    public readonly type = OrdersActionTypes.DELETE_ORDER;
    constructor(public payload: IOrder){}
}

export class OrderDeleted implements Action{
    public readonly type = OrdersActionTypes.ORDER_DELETED;
    constructor(public payload: IOrder){}
}
export class OrderDeleteFail implements Action{
    public readonly type = OrdersActionTypes.ORDER_DELETE_FAIL;
    constructor(public payload: any){}
}

export class ReadOrder implements Action{
    public readonly type = OrdersActionTypes.READ_ORDER;
    constructor(public payload: string){}
}

export class OrderRead implements Action{
    public readonly type = OrdersActionTypes.ORDER_READ;
    constructor(public payload: IOrder){}
}
export class OrderReadFail implements Action{
    public readonly type = OrdersActionTypes.ORDER_READ_FAIL;
    constructor(public payload: any){}
}

export const isActionTypeFail = (action:OrdersActions):boolean => {
    return action.type === OrdersActionTypes.ORDERS_LOAD_FAIL
        || action.type === OrdersActionTypes.ORDER_UPDATE_FAIL
        || action.type === OrdersActionTypes.ORDER_DELETE_FAIL
        || action.type === OrdersActionTypes.ORDER_CREATE_FAIL
        || action.type === OrdersActionTypes.ORDER_READ_FAIL
}
export const isActionTypeSuccess = (action:OrdersActions):boolean => {
    return action.type === OrdersActionTypes.ORDERS_LOADED
        || action.type === OrdersActionTypes.ORDER_UPDATED
        || action.type === OrdersActionTypes.ORDER_DELETED
        || action.type === OrdersActionTypes.ORDER_CREATED
        || action.type === OrdersActionTypes.ORDER_READ
}

export type OrdersActions = LoadOrders |
OrdersLoaded |
OrdersLoadFail |
CreateOrder |
OrderCreated |
OrderCreateFail |
UpdateOrder |
OrderUpdated |
OrderUpdateFail |
DeleteOrder |
OrderDeleted |
OrderDeleteFail |
ReadOrder |
OrderRead |
OrderReadFail
