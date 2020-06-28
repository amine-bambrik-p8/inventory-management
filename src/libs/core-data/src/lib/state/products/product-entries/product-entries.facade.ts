
import { Injectable } from "@angular/core";
import { ProductsState, selectAllProducts, selectedProduct } from '../products.reducer';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { filter, take } from 'rxjs/operators';
import { IProductEntry } from '@workspace/interfaces';
import { CreateProductEntry, UpdateProductEntry, DeleteProductEntry, LoadProductEntries, SetProductMainEntry, ProductEntriesActions, ProductEntriesActionTypes,isActionTypeFail, isActionTypeSuccess } from './product-entries.actions';

@Injectable({
    providedIn:'root'
})
export class ProductEntriesFacade{
    allProducts$ = this.store.pipe(select(selectAllProducts));
    selectedProduct$ = this.store.pipe(select(selectedProduct));
    actionCompleted$ = this.actions$
    .pipe(
        filter((action:ProductEntriesActions) =>
            isActionTypeFail(action) || isActionTypeSuccess(action)
        ),
        take(1)
    );
    mutations$ = this.actions$
    .pipe(
      filter(action =>
        action.type === ProductEntriesActionTypes.CREATE_PRODUCT_ENTRY
        || action.type === ProductEntriesActionTypes.UPDATE_PRODUCT_ENTRY
        || action.type === ProductEntriesActionTypes.DELETE_PRODUCT_ENTRY
        || action.type === ProductEntriesActionTypes.SET_PRODUCT_MAIN_ENTRY
      )
    );
    constructor(private store: Store<ProductsState>,private actions$: ActionsSubject) {}
    setProductMainEntry(id:string,item:IProductEntry):Promise<void>{
        return this.dispatchAction(new SetProductMainEntry(id,item));
    }
    loadProductEntries(id:string):Promise<void>{
        return this.dispatchAction(new LoadProductEntries(id));
    }
    addProductEntry(id:string,item:IProductEntry):Promise<void>{
        return this.dispatchAction(new CreateProductEntry(id,item));
    }
    updateProductEntry(id:string,item:IProductEntry):Promise<void>{
        return this.dispatchAction(new UpdateProductEntry(id,item));
    }
    deleteProductEntry(id:string,item:IProductEntry):Promise<void>{
        return this.dispatchAction(new DeleteProductEntry(id,item));
    }
    private async dispatchAction(action:ProductEntriesActions):Promise<void>{
        this.store.dispatch(action);
        const response:any = await this.actionCompleted$.toPromise();
        if(isActionTypeFail(response)){
            const httpError = response.payload;
            throw httpError;
        }
    }
}