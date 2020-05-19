import { ProductsActionTypes, ProductsActions, UpdateProduct, CreateProduct, LoadProducts, DeleteProduct } from './products.actions';
import { Injectable } from "@angular/core";
import { ProductsState, selectAllProducts } from './products.reducer';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { filter } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class ProductsFacade{
    allProducts$ = this.store.pipe(select(selectAllProducts));
    mutations$ = this.actions$
    .pipe(
      filter(action =>
        action.type === ProductsActionTypes.CREATE_PRODUCT
        || action.type === ProductsActionTypes.UPDATE_PRODUCT
        || action.type === ProductsActionTypes.DELETE_PRODUCT
      )
    );
    constructor(private store: Store<ProductsState>,private actions$: ActionsSubject) {}
    
    loadProducts() {
        this.store.dispatch(new LoadProducts());
    }
    
    addProduct(item) {
        this.store.dispatch(new CreateProduct(item));
    }
    
    updateProduct(item) {
        this.store.dispatch(new UpdateProduct(item));
    }
    
    deleteProduct(item) {
        this.store.dispatch(new  DeleteProduct(item));
    }
}