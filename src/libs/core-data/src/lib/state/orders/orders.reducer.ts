import { OrdersActions, OrdersActionTypes } from './orders.actions';
import { IOrder } from '@workspace/interfaces';
import { EntityAdapter,EntityState,createEntityAdapter } from '@ngrx/entity';

export interface OrdersState extends EntityState<IOrder>{
    
}

const adapter: EntityAdapter<IOrder> = createEntityAdapter<IOrder>({
    selectId: (order: IOrder)=> order._id
});

export const initialState: OrdersState =  adapter.getInitialState({
    
});

export function ordersReducers(state = initialState,action:OrdersActions): OrdersState{
    switch (action.type) {
        case OrdersActionTypes.ORDERS_LOADED:
            return adapter.setAll(action.payload,state);
        case OrdersActionTypes.ORDER_CREATED:
            return adapter.addOne(action.payload,state);
        case OrdersActionTypes.ORDER_DELETED:
            return adapter.removeOne(action.payload._id,state);
        case OrdersActionTypes.ORDER_UPDATED:
            const {_id:id,...changes} = action.payload;
            return adapter.updateOne({
                id,
                changes,
            },state);
        default:
            return state;
    }
}


const { selectIds , selectAll , selectEntities , selectTotal} = adapter.getSelectors();

export const selectOrdersIds = selectIds;
export const selectAllOrders = selectAll;
export const selectOrdersEntities = selectEntities;
export const selectOrdersTotal = selectTotal;