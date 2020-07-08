import { CategoriesActionTypes, CategoriesActions, UpdateCategory, CreateCategory, LoadCategories, DeleteCategory, ReadCategory } from './categories.actions';
import { Injectable } from "@angular/core";
import { CategoriesState, selectAllCategories, selectedCategory } from './categories.reducer';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { ICategory } from '@workspace/interfaces';

@Injectable({
    providedIn:'root'
})
export class CategoriesFacade{
    allCategories$ = this.store.pipe(select(selectAllCategories));
    selectedCategory = this.store.pipe(select(selectedCategory));
    mutations$ = this.actions$
    .pipe(
      filter(action =>
        action.type === CategoriesActionTypes.CREATE_CATEGORY
        || action.type === CategoriesActionTypes.UPDATE_CATEGORY
        || action.type === CategoriesActionTypes.DELETE_CATEGORY
      )
    );
    constructor(private store: Store<CategoriesState>,private actions$: ActionsSubject) {}
    readCategory(id:string):void{
        this.store.dispatch(new ReadCategory(id));
    }
    loadCategories():void {
        this.store.dispatch(new LoadCategories());
    }
    
    addCategory(item:ICategory):void{
        this.store.dispatch(new CreateCategory(item));
    }
    
    updateCategory(item:ICategory):void{
        this.store.dispatch(new UpdateCategory(item));
    }
    
    deleteCategory(item:ICategory):void{
        this.store.dispatch(new  DeleteCategory(item));
    }
}