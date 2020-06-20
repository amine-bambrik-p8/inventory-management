import { SuppliersActionTypes, SuppliersActions, UpdateSupplier, CreateSupplier, LoadSuppliers, DeleteSupplier, ReadSupplier, isActionTypeSuccess, isActionTypeFail } from './suppliers.actions';
import { Injectable } from "@angular/core";
import { SuppliersState, selectAllSuppliers, selectedSupplier } from './suppliers.reducer';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { filter, take } from 'rxjs/operators';
import { ISupplier } from '@workspace/interfaces';

@Injectable({
    providedIn:'root'
})
export class SuppliersFacade{
    allSuppliers$ = this.store.pipe(select(selectAllSuppliers));
    selectedSupplier$ = this.store.pipe(select(selectedSupplier));
    actionCompleted$ = this.actions$
    .pipe(
        filter((action:SuppliersActions) =>
            isActionTypeFail(action) || isActionTypeSuccess(action)
        ),
        take(1)
    );
    mutations$ = this.actions$
    .pipe(
      filter(action =>
        action.type === SuppliersActionTypes.CREATE_SUPPLIER
        || action.type === SuppliersActionTypes.UPDATE_SUPPLIER
        || action.type === SuppliersActionTypes.DELETE_SUPPLIER
      )
    );
    constructor(private store: Store<SuppliersState>,private actions$: ActionsSubject) {}
    readSupplier(id:string):Promise<void>{
        return this.dispatchAction(new ReadSupplier(id));
    }
    loadSuppliers():Promise<void>{
        return this.dispatchAction(new LoadSuppliers());
    }
    addSupplier(item:ISupplier):Promise<void>{
        return this.dispatchAction(new CreateSupplier(item));
    }
    updateSupplier(item:ISupplier):Promise<void>{
        return this.dispatchAction(new UpdateSupplier(item));
    }
    deleteSupplier(item:ISupplier):Promise<void>{
        return this.dispatchAction(new DeleteSupplier(item));
    }
    private async dispatchAction(action:SuppliersActions):Promise<void>{
        this.store.dispatch(action);
        const response:any = await this.actionCompleted$.toPromise();
        if(isActionTypeFail(response)){
            const httpError = response.payload;
            throw httpError;
        }
    }
}