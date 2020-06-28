import { ProductsActionTypes, ProductsActions, UpdateProduct, CreateProduct, LoadProducts, DeleteProduct, ReadProduct, isActionTypeFail, isActionTypeSuccess } from './products.actions';
import { Injectable } from "@angular/core";
import { ProductsState, selectAllProducts, selectedProduct, selectProductByCodebar } from './products.reducer';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { filter, take, takeLast } from 'rxjs/operators';
import { IProduct } from '@workspace/interfaces';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class ProductsFacade{
    allProducts$:Observable<IProduct[]> = this.store.pipe(select(selectAllProducts));
    selectedProduct$:Observable<IProduct> = this.store.pipe(select(selectedProduct));
    selectedProductByCodebar$?:Observable<IProduct>;
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
    loadProducts(props?:any):Promise<void>{
        return this.dispatchAction(new LoadProducts(props));
    }
    readProductByCodebar(codebar:string):Promise<void>{
        const props ={
            codebar
        };
        this.selectedProductByCodebar$=this.store
        .pipe(
            select(selectProductByCodebar,props),
            take(1)
        );
        return this.loadProducts(props);
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