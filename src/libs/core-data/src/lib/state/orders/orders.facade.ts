import { OrdersActionTypes, OrdersActions, UpdateOrder, CreateOrder, LoadOrders, DeleteOrder, ReadOrder } from './orders.actions';
import { Injectable } from "@angular/core";
import { OrdersState, selectAllOrders, selectedOrder } from './orders.reducer';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { IOrder } from '@workspace/interfaces';

@Injectable({
    providedIn:'root'
})
export class OrdersFacade{
    allOrders$ = this.store.pipe(select(selectAllOrders));
    selectedOrder$ = this.store.pipe(select(selectedOrder))
    mutations$ = this.actions$
    .pipe(
      filter(action =>
        action.type === OrdersActionTypes.CREATE_ORDER
        || action.type === OrdersActionTypes.UPDATE_ORDER
        || action.type === OrdersActionTypes.DELETE_ORDER
      )
    );
    constructor(private store: Store<OrdersState>,private actions$: ActionsSubject) {}
    readOrder(id:string):void{
        this.store.dispatch(new ReadOrder(id))
    }
    loadOrders():void{
        this.store.dispatch(new LoadOrders());
    }
    
    addOrder(item:IOrder):void{
        this.store.dispatch(new CreateOrder(item));
    }
    
    updateOrder(item:IOrder):void{
        this.store.dispatch(new UpdateOrder(item));
    }
    
    deleteOrder(item:IOrder):void{
        this.store.dispatch(new  DeleteOrder(item));
    }
}