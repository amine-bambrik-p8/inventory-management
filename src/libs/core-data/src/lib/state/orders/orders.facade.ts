import { OrdersActionTypes, OrdersActions, UpdateOrder, CreateOrder, LoadOrders, DeleteOrder, ReadOrder, isActionTypeFail, isActionTypeSuccess } from './orders.actions';
import { Injectable } from "@angular/core";
import { OrdersState, selectAllOrders, selectedOrder } from './orders.reducer';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { filter, take } from 'rxjs/operators';
import { IOrder } from '@workspace/interfaces';

@Injectable({
    providedIn:'root'
})
export class OrdersFacade{
    allOrders$ = this.store.pipe(select(selectAllOrders));
    selectedOrder$ = this.store.pipe(select(selectedOrder));
    actionCompleted$ = this.actions$
    .pipe(
        filter((action:OrdersActions) =>
            isActionTypeFail(action) || isActionTypeSuccess(action)
        ),
        take(1)
    );
    mutations$ = this.actions$
    .pipe(
      filter(action =>
        action.type === OrdersActionTypes.CREATE_ORDER
        || action.type === OrdersActionTypes.UPDATE_ORDER
        || action.type === OrdersActionTypes.DELETE_ORDER
      )
    );
    constructor(private store: Store<OrdersState>,private actions$: ActionsSubject) {}
    readOrder(id:string):Promise<void>{
        return this.dispatchAction(new ReadOrder(id));
    }
    loadOrders():Promise<void>{
        return this.dispatchAction(new LoadOrders());
    }
    addOrder(item:IOrder):Promise<void>{
        return this.dispatchAction(new CreateOrder(item));
    }
    updateOrder(item:IOrder):Promise<void>{
        return this.dispatchAction(new UpdateOrder(item));
    }
    deleteOrder(item:IOrder):Promise<void>{
        return this.dispatchAction(new DeleteOrder(item));
    }
    private async dispatchAction(action:OrdersActions):Promise<void>{
        this.store.dispatch(action);
        const response:any = await this.actionCompleted$.toPromise();
        if(isActionTypeFail(response)){
            const httpError = response.payload;
            throw httpError;
        }
    }
}