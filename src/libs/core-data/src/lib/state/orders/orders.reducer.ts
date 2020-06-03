import { OrdersActions, OrdersActionTypes } from './orders.actions';
import { IOrder } from '@workspace/interfaces';
import { EntityAdapter,EntityState,createEntityAdapter } from '@ngrx/entity';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export interface OrdersState extends EntityState<IOrder>{
    selectedOrder:IOrder;
}

const adapter: EntityAdapter<IOrder> = createEntityAdapter<IOrder>({
    selectId: (order: IOrder)=> order._id
});

export const initialState: OrdersState =  adapter.getInitialState({
    selectedOrder:null,
});

export function ordersReducers(state = initialState,action:OrdersActions): OrdersState{
    switch (action.type) {
        case OrdersActionTypes.ORDER_READ:
            return adapter.addOne(action.payload,state);
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


const selectOrdersState = createFeatureSelector<OrdersState>('orders');
const { selectIds , selectAll , selectEntities , selectTotal} = adapter.getSelectors();

export const selectOrdersIds = createSelector(selectOrdersState,selectIds);
export const selectAllOrders = createSelector(selectOrdersState,selectAll);
export const selectOrdersEntities = createSelector(selectOrdersState,selectEntities);
export const selectOrdersTotal = createSelector(selectOrdersState,selectTotal);
export const selectedOrder = createSelector(selectOrdersState,(state)=>state.selectedOrder)