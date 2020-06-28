import { AddProductToCart, DeleteProductFromCart, SetSelectedOrderEntry, UpdateOrderEntry, CartActionTypes, UnsetSelectedOrderEntry, ClearCart } from './cart.actions';
import { Injectable } from "@angular/core";
import { ActionsSubject, Store, select } from '@ngrx/store';
import { CartState, selectAllOrderEntries, selectedOrderEntry, selectCartItems } from './cart.reducer';
import { IOrderEntry, IProduct } from '@workspace/interfaces';
import { filter } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class CartFacade{
    allOrderEntries$ = this.store.pipe(select(selectAllOrderEntries));
    selectedOrderEntry$ = this.store.pipe(select(selectedOrderEntry));
    allCartItems$ = this.store.pipe(select(selectCartItems));
    mutations$ = this.actions$
    .pipe(
      filter(action =>
        action.type === CartActionTypes.ADD_PRODUCT_TO_CART
        || action.type === CartActionTypes.DELETE_PRODUCT_FROM_CART
        || action.type === CartActionTypes.UPDATE_ORDER_ENTRY
      )
    );
    constructor(private store: Store<CartState>,private actions$: ActionsSubject) {}
    addProductToCart(item:IProduct){
        this.store.dispatch(new AddProductToCart(item));
    }
    removeProductFromCart(id:string){
        this.store.dispatch(new DeleteProductFromCart(id));
    }
    setSelectedOrderEntry(id:string){
        this.store.dispatch(new SetSelectedOrderEntry(id));
    }
    unsetSelectedOrderEntry(){
        this.store.dispatch(new UnsetSelectedOrderEntry())
    }
    updateOrderEntry(item:IOrderEntry){
        this.store.dispatch(new UpdateOrderEntry(item));
    }
    clearCart() {
        this.store.dispatch(new ClearCart());
    }
}