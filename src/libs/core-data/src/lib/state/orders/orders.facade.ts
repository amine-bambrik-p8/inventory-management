import { OrdersActionTypes, OrdersActions, UpdateOrder, CreateOrder, LoadOrders, DeleteOrder } from './orders.actions';
import { Injectable } from "@angular/core";
import { OrdersState, selectAllOrders } from './orders.reducer';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { filter } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class OrdersFacade{
    allOrders$ = this.store.pipe(select(selectAllOrders));
    mutations$ = this.actions$
    .pipe(
      filter(action =>
        action.type === OrdersActionTypes.CREATE_ORDER
        || action.type === OrdersActionTypes.UPDATE_ORDER
        || action.type === OrdersActionTypes.DELETE_ORDER
      )
    );
    constructor(private store: Store<OrdersState>,private actions$: ActionsSubject) {}
    
    loadOrders() {
        this.store.dispatch(new LoadOrders());
    }
    
    addOrder(item) {
        this.store.dispatch(new CreateOrder(item));
    }
    
    updateOrder(item) {
        this.store.dispatch(new UpdateOrder(item));
    }
    
    deleteOrder(item) {
        this.store.dispatch(new  DeleteOrder(item));
    }
}