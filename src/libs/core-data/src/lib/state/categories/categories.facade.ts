import { CategoriesActionTypes, CategoriesActions, UpdateCategory, CreateCategory, LoadCategories, DeleteCategory } from './categories.actions';
import { Injectable } from "@angular/core";
import { CategoriesState, selectAllCategories } from './categories.reducer';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { filter } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class CategoriesFacade{
    allCategories$ = this.store.pipe(select(selectAllCategories));
    mutations$ = this.actions$
    .pipe(
      filter(action =>
        action.type === CategoriesActionTypes.CREATE_CATEGORY
        || action.type === CategoriesActionTypes.UPDATE_CATEGORY
        || action.type === CategoriesActionTypes.DELETE_CATEGORY
      )
    );
    constructor(private store: Store<CategoriesState>,private actions$: ActionsSubject) {}
    
    loadCategories() {
        this.store.dispatch(new LoadCategories());
    }
    
    addCategory(item) {
        this.store.dispatch(new CreateCategory(item));
    }
    
    updateCategory(item) {
        this.store.dispatch(new UpdateCategory(item));
    }
    
    deleteCategory(item) {
        this.store.dispatch(new  DeleteCategory(item));
    }
}