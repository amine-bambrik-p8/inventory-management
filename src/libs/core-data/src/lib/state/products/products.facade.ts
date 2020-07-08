import { ProductsActionTypes, ProductsActions, UpdateProduct, CreateProduct, LoadProducts, DeleteProduct, ReadProduct } from './products.actions';
import { Injectable } from "@angular/core";
import { ProductsState, selectAllProducts, selectedProduct } from './products.reducer';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { IProduct } from '@workspace/interfaces';

@Injectable({
    providedIn:'root'
})
export class ProductsFacade{
    allProducts$ = this.store.pipe(select(selectAllProducts));
    selectedProduct$ = this.store.pipe(select(selectedProduct));
    mutations$ = this.actions$
    .pipe(
      filter(action =>
        action.type === ProductsActionTypes.CREATE_PRODUCT
        || action.type === ProductsActionTypes.UPDATE_PRODUCT
        || action.type === ProductsActionTypes.DELETE_PRODUCT
      )
    );
    constructor(private store: Store<ProductsState>,private actions$: ActionsSubject) {}
    readProduct(id:string):void{
        this.store.dispatch(new ReadProduct(id));
    }
    loadProducts():void{
        this.store.dispatch(new LoadProducts());
    }
    
    addProduct(item:IProduct):void{
        this.store.dispatch(new CreateProduct(item));
    }
    
    updateProduct(item:IProduct):void{
        this.store.dispatch(new UpdateProduct(item));
    }
    
    deleteProduct(item:IProduct):void{
        this.store.dispatch(new  DeleteProduct(item));
    }
}