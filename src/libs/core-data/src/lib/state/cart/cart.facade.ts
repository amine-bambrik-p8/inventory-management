import { AddOrderEntry, DeleteOrderEntry, SelectOrderEntry, UpdateOrderEntry } from './cart.actions';
import { Injectable } from "@angular/core";
import { ActionsSubject, Store, select } from '@ngrx/store';
import { CartState, selectAllOrderEntries } from './cart.reducer';

@Injectable({
    providedIn:'root'
})
export class CartFacade{
    allOrderEntries$ = this.store.pipe(select(selectAllOrderEntries))
    constructor(private store: Store<CartState>,private actions$: ActionsSubject) {}
    addProductToCart(item){
        this.store.dispatch(new AddOrderEntry(item));
    }
    removeProductToCart(item){
        this.store.dispatch(new DeleteOrderEntry(item));
    }
    selectOrderEntry(item){
        this.store.dispatch(new SelectOrderEntry(item));
    }
    updateOrderEntry(item){
        this.store.dispatch(new UpdateOrderEntry(item));
    }

}