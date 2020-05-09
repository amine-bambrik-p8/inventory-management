import { CategoriesService } from './../../categories/categories.service';
import { CategoriesState } from './categories.reducer';
import { CategoriesActions, CategoriesLoaded, CategoryCreated, CategoriesActionTypes, LoadCategories, CreateCategory, CategoryUpdated, CategoryDeleted, DeleteCategory, UpdateCategory } from './categories.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { DataPersistence } from '@nrwl/nx';
import { map } from 'rxjs/operators';
import { ICategory } from '@workspace/interfaces';
@Injectable({
    providedIn:'root',
})
export class CategoriesEffects {
    @Effect()
    loadCategories$: Observable<CategoriesLoaded> = this.dataPersistence.fetch(CategoriesActionTypes.LOAD_CATEGORIES,{
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
    });
    @Effect()
    createCategory$: Observable<CategoryCreated> = this.dataPersistence.pessimisticUpdate(CategoriesActionTypes.CREATE_CATEGORY,{
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
    });
    @Effect()
    updateCategory$: Observable<CategoryUpdated> = this.dataPersistence.pessimisticUpdate(CategoriesActionTypes.UPDATE_CATEGORY,{
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
    });

    @Effect()
    deleteCategory$: Observable<CategoryDeleted> = this.dataPersistence.pessimisticUpdate(CategoriesActionTypes.DELETE_CATEGORY,{
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
    });

    constructor(
        private dataPersistence: DataPersistence<CategoriesState>,
        private categoriesService: CategoriesService
        ){}
}