import { ProductsActionTypes, ProductsActions, UpdateProduct, CreateProduct, LoadProducts, DeleteProduct, ReadProduct, isActionTypeFail, isActionTypeSuccess } from './products.actions';
import { Injectable } from "@angular/core";
import { ProductsState, selectAllProducts, selectedProduct } from './products.reducer';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { filter, take } from 'rxjs/operators';
import { IProduct } from '@workspace/interfaces';

@Injectable({
    providedIn:'root'
})
export class ProductsFacade{
    allProducts$ = this.store.pipe(select(selectAllProducts));
    selectedProduct$ = this.store.pipe(select(selectedProduct));
    actionCompleted$ = this.actions$
    .pipe(
        filter((action:ProductsActions) =>
            isActionTypeFail(action) || isActionTypeSuccess(action)
        ),
        take(1)
    );
    mutations$ = this.actions$
    .pipe(
      filter(action =>
        action.type === ProductsActionTypes.CREATE_PRODUCT
        || action.type === ProductsActionTypes.UPDATE_PRODUCT
        || action.type === ProductsActionTypes.DELETE_PRODUCT
      )
    );
    constructor(private store: Store<ProductsState>,private actions$: ActionsSubject) {}
    readProduct(id:string):Promise<void>{
        return this.dispatchAction(new ReadProduct(id));
    }
    loadProducts():Promise<void>{
        return this.dispatchAction(new LoadProducts());
    }
    addProduct(item:IProduct):Promise<void>{
        return this.dispatchAction(new CreateProduct(item));
    }
    updateProduct(item:IProduct):Promise<void>{
        return this.dispatchAction(new UpdateProduct(item));
    }
    deleteProduct(item:IProduct):Promise<void>{
        return this.dispatchAction(new DeleteProduct(item));
    }
    private async dispatchAction(action:ProductsActions):Promise<void>{
        this.store.dispatch(action);
        const response:any = await this.actionCompleted$.toPromise();
        if(isActionTypeFail(response)){
            const httpError = response.payload;
            throw httpError;
        }
    }
}