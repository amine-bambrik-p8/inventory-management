import { CategoriesService } from './../../categories/categories.service';
import { CategoriesState } from './categories.reducer';
import { CategoriesLoaded, CategoryCreated, CategoriesActionTypes, LoadCategories, CreateCategory, CategoryUpdated, CategoryDeleted, DeleteCategory, UpdateCategory, CategoryRead, ReadCategory } from './categories.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { ICategory } from '@workspace/interfaces';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
@Injectable({
    providedIn:'root',
})
export class CategoriesEffects {
    @Effect()
    loadCategories$ = createEffect(()=>this.actions$.pipe(ofType(CategoriesActionTypes.LOAD_CATEGORIES),fetch({
        run:(action: LoadCategories,state: CategoriesState)=>{
            return this.categoriesService
            .readMany()
            .pipe(
                map((categories:ICategory[])=>{
                    return new CategoriesLoaded(categories);
                })
            );
        },
        onError(action: LoadCategories,error: any){
            console.log(error); // Implement
        }
    })));
    @Effect()
    createCategory$ = createEffect(()=>this.actions$.pipe(ofType(CategoriesActionTypes.CREATE_CATEGORY),pessimisticUpdate({
        run:(action: CreateCategory,state: CategoriesState)=>{
            return this.categoriesService
            .createOne(action.payload)
            .pipe(
                map((category:ICategory)=>{
                    return new CategoryCreated(category);
                })
            );
        },
        onError(action: CreateCategory,error: any){
            console.log(error);
        }
    })));
    @Effect()
    updateCategory$ = createEffect(()=>this.actions$.pipe(ofType(CategoriesActionTypes.UPDATE_CATEGORY),pessimisticUpdate({
        run:(action: UpdateCategory,state: CategoriesState)=>{    
            return this.categoriesService
            .updateOne(action.payload._id,action.payload)
            .pipe(
                map((category: ICategory)=>{
                    return new CategoryUpdated(category);
                })
            );
        },
        onError(action: UpdateCategory,error){
            console.log(error);
        }
    })));

    @Effect()
    deleteCategory$  = createEffect(()=>this.actions$.pipe(ofType(CategoriesActionTypes.DELETE_CATEGORY),pessimisticUpdate({
        run:(action: DeleteCategory,state: CategoriesState)=>{
            return this.categoriesService
            .deleteOne(action.payload._id)
            .pipe(
                map((category)=>{
                    return new CategoryDeleted(category);
                })
            );
        },
        onError(action: DeleteCategory,error: any){
            console.log(error);
        }
    })));
    @Effect()
    readCategory$ = createEffect(()=>this.actions$.pipe(ofType(CategoriesActionTypes.READ_CATEGORY),fetch({
        run:(action:ReadCategory,state:CategoriesState)=>{
            return this.categoriesService
            .readOne(action.payload)
            .pipe(
                map((category:ICategory)=>{
                    return new CategoryRead(category)
                })
            );
        },
        onError(action: ReadCategory,error:any){
            console.error(error);
        }
    })));
    constructor(
        private categoriesService: CategoriesService,
        private actions$: Actions
        ){}
}