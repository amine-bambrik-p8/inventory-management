import { IOrder } from '@workspace/interfaces';
import { Action } from '@ngrx/store';

export enum OrdersActionTypes{
    LOAD_ORDERS='[Orders] Load',
    ORDERS_LOADED='[Orders] Loaded',
    CREATE_ORDER='[Orders] Create',
    ORDER_CREATED='[Orders] Created',
    UPDATE_ORDER='[Orders] Update',
    ORDER_UPDATED='[Orders] Updated',
    DELETE_ORDER='[Orders] Delete',
    ORDER_DELETED='[Orders] Deleted',
    READ_ORDER='[Orders] Read]',
    ORDER_READ='[Orders] Read Done]',
}

export class LoadOrders implements Action{
    public readonly type = OrdersActionTypes.LOAD_ORDERS;
}

export class OrdersLoaded implements Action{
    public readonly type = OrdersActionTypes.ORDERS_LOADED;
    constructor(public payload: IOrder[]){}
}

export class CreateOrder implements Action{
    public readonly type = OrdersActionTypes.CREATE_ORDER;
    constructor(public payload: IOrder){}
}

export class OrderCreated implements Action{
    public readonly type = OrdersActionTypes.ORDER_CREATED;
    constructor(public payload: IOrder){}
}

export class UpdateOrder implements Action{
    public readonly type = OrdersActionTypes.UPDATE_ORDER;
    constructor(public payload: IOrder){}
}

export class OrderUpdated implements Action{
    public readonly type = OrdersActionTypes.ORDER_UPDATED;
    constructor(public payload: IOrder){}
}


export class DeleteOrder implements Action{
    public readonly type = OrdersActionTypes.DELETE_ORDER;
    constructor(public payload: IOrder){}
}

export class OrderDeleted implements Action{
    public readonly type = OrdersActionTypes.ORDER_DELETED;
    constructor(public payload: IOrder){}
}

export class ReadOrder implements Action{
    public readonly type = OrdersActionTypes.READ_ORDER;
    constructor(public payload: string){}
}

export class OrderRead implements Action{
    public readonly type = OrdersActionTypes.ORDER_READ;
    constructor(public payload: IOrder){}
}

export type OrdersActions = LoadOrders |
OrdersLoaded |
CreateOrder |
OrderCreated |
UpdateOrder |
OrderUpdated |
DeleteOrder |
OrderDeleted |
ReadOrder |
OrderRead