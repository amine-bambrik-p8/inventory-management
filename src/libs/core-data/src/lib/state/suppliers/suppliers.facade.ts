import { SuppliersActionTypes, SuppliersActions, UpdateSupplier, CreateSupplier, LoadSuppliers, DeleteSupplier } from './suppliers.actions';
import { Injectable } from "@angular/core";
import { SuppliersState, selectAllSuppliers } from './suppliers.reducer';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { filter } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class SuppliersFacade{
    allSuppliers$ = this.store.pipe(select(selectAllSuppliers));
    mutations$ = this.actions$
    .pipe(
      filter(action =>
        action.type === SuppliersActionTypes.CREATE_SUPPLIER
        || action.type === SuppliersActionTypes.UPDATE_SUPPLIER
        || action.type === SuppliersActionTypes.DELETE_SUPPLIER
      )
    );
    constructor(private store: Store<SuppliersState>,private actions$: ActionsSubject) {}
    
    loadSuppliers() {
        this.store.dispatch(new LoadSuppliers());
    }
    
    addSupplier(item) {
        this.store.dispatch(new CreateSupplier(item));
    }
    
    updateSupplier(item) {
        this.store.dispatch(new UpdateSupplier(item));
    }
    
    deleteSupplier(item) {
        this.store.dispatch(new  DeleteSupplier(item));
    }
}