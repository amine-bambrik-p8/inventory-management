import { CategoriesActionTypes, CategoriesActions, UpdateCategory, CreateCategory, LoadCategories, DeleteCategory, ReadCategory, isActionTypeFail, isActionTypeSuccess } from './categories.actions';
import { Injectable } from "@angular/core";
import { CategoriesState, selectAllCategories, selectedCategory } from './categories.reducer';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { filter, take } from 'rxjs/operators';
import { ICategory } from '@workspace/interfaces';

@Injectable({
    providedIn:'root'
})
export class CategoriesFacade{
    allCategories$ = this.store.pipe(select(selectAllCategories));
    selectedCategory = this.store.pipe(select(selectedCategory));
    actionCompleted$ = this.actions$
    .pipe(
        filter((action:CategoriesActions) =>
            isActionTypeFail(action) || isActionTypeSuccess(action)
        ),
        take(1)
    );
    mutations$ = this.actions$
    .pipe(
      filter(action =>
        action.type === CategoriesActionTypes.CREATE_CATEGORY
        || action.type === CategoriesActionTypes.UPDATE_CATEGORY
        || action.type === CategoriesActionTypes.DELETE_CATEGORY
      )
    );
    constructor(private store: Store<CategoriesState>,private actions$: ActionsSubject) {}
    async readCategory(id:string):Promise<void>{
        this.store.dispatch(new ReadCategory(id));
        const action:any = await this.actionCompleted$.toPromise();
        if(isActionTypeFail(action)){
            const httpError = action.payload;
            throw httpError;
        }
    }
    async loadCategories():Promise<void> {
        this.store.dispatch(new LoadCategories());
        const action:any = await this.actionCompleted$.toPromise();
        if(isActionTypeFail(action)){
            const httpError = action.payload;
            throw httpError;
        }
    }
    
    async addCategory(item:ICategory):Promise<void>{
        this.store.dispatch(new CreateCategory(item));
        const action:any = await this.actionCompleted$.toPromise();
        if(isActionTypeFail(action)){
            const httpError = action.payload;
            throw httpError;
        }
    }
    
    async updateCategory(item:ICategory):Promise<void>{
        this.store.dispatch(new UpdateCategory(item));
        const action:any = await this.actionCompleted$.toPromise();
        if(isActionTypeFail(action)){
            const httpError = action.payload;
            throw httpError;
        }
    }
    
    async deleteCategory(item:ICategory):Promise<void>{
        this.store.dispatch(new  DeleteCategory(item));
        const action:any = await this.actionCompleted$.toPromise();
        if(isActionTypeFail(action)){
            const httpError = action.payload;
            throw httpError;
        }
    }
}