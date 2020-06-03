import { SuppliersActionTypes, SuppliersActions, UpdateSupplier, CreateSupplier, LoadSuppliers, DeleteSupplier, ReadSupplier } from './suppliers.actions';
import { Injectable } from "@angular/core";
import { SuppliersState, selectAllSuppliers, selectedSupplier } from './suppliers.reducer';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { ISupplier } from '@workspace/interfaces';

@Injectable({
    providedIn:'root'
})
export class SuppliersFacade{
    allSuppliers$ = this.store.pipe(select(selectAllSuppliers));
    selectedSupplier$ = this.store.pipe(select(selectedSupplier))
    mutations$ = this.actions$
    .pipe(
      filter(action =>
        action.type === SuppliersActionTypes.CREATE_SUPPLIER
        || action.type === SuppliersActionTypes.UPDATE_SUPPLIER
        || action.type === SuppliersActionTypes.DELETE_SUPPLIER
      )
    );
    constructor(private store: Store<SuppliersState>,private actions$: ActionsSubject) {}
    readSupplier(id:string){
        this.store.dispatch(new ReadSupplier(id));
    }
    loadSuppliers() {
        this.store.dispatch(new LoadSuppliers());
    }
    
    addSupplier(item:ISupplier) {
        this.store.dispatch(new CreateSupplier(item));
    }
    
    updateSupplier(item:ISupplier) {
        this.store.dispatch(new UpdateSupplier(item));
    }
    
    deleteSupplier(item:ISupplier) {
        this.store.dispatch(new  DeleteSupplier(item));
    }
}