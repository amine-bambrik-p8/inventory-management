import { ProductsState } from '../products.reducer';
import { ProductEntriesService } from '../../../products/product-entries/product-entries.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { IProduct, IProductEntry } from '@workspace/interfaces';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { pessimisticUpdate } from '@nrwl/angular';
import { ProductEntriesActionTypes, CreateProductEntry, ProductEntryCreated, ProductEntryCreateFail, DeleteProductEntry, ProductEntryDeleteFail, ProductEntryDeleted, UpdateProductEntry, ProductEntryUpdateFail, ProductEntryUpdated, SetProductMainEntry, ProductMainEntrySet, ProductMainEntryFailedToBeSet } from './product-entries.actions';
@Injectable({
    providedIn:"root",
})
export class ProductEntriesEffects {
    //@Effect()
    /*loadProducts$ = createEffect(()=>this.actions$.pipe(ofType(ProductsActionTypes.LOAD_PRODUCTS),fetch({
        run:(action: LoadProductEntries,state: ProductsState)=>{
            const productId:string = action.id;
            return this.productsService
            .readMany(productId)
            .pipe(
                map((products:IProduct[])=>{
                    return new ProductsLoaded(products);
                })
            );
        },
        onError(action: LoadProducts,error: any){
            return of(new ProductsLoadFail(error));
        }
    })));*/
    //@Effect()
    createProduct$ = createEffect(()=>this.actions$.pipe(ofType(ProductEntriesActionTypes.CREATE_PRODUCT_ENTRY),pessimisticUpdate({
        run:(action: CreateProductEntry,state: ProductsState)=>{
            const productId:string = action.id;
            return this.productsService
            .createOne(productId,action.payload)
            .pipe(
                map((product:IProduct)=>{
                    return new ProductEntryCreated(productId,product);
                })
            );
        },
        onError(action: CreateProductEntry,error: any){
            const productId:string = action.id;
            return of(new ProductEntryCreateFail(productId,error));
        }
    })));
    //@Effect()
    deleteProduct$ = createEffect(()=>this.actions$.pipe(ofType(ProductEntriesActionTypes.DELETE_PRODUCT_ENTRY),pessimisticUpdate({
        run:(action: DeleteProductEntry,state: ProductsState)=>{
            const productId:string = action.id;
            return this.productsService
            .deleteOne(productId,action.payload._id)
            .pipe(
                map((product:IProduct)=>{
                    return new ProductEntryDeleted(productId,product);
                })
            );
        },
        onError(action: DeleteProductEntry,error: any){
            const productId:string = action.id;
            return of(new ProductEntryDeleteFail(productId,error));
        }
    })));
    //@Effect()
    updateProduct$ = createEffect(()=>this.actions$.pipe(ofType(ProductEntriesActionTypes.UPDATE_PRODUCT_ENTRY),pessimisticUpdate({
        run:(action: UpdateProductEntry,state: ProductsState)=>{
            const productId:string = action.id;

            const {_id:id,...changes} = action.payload;
            return this.productsService
            .updateOne(productId,id,changes)
            .pipe(
                map((product:IProduct)=>{
                    return new ProductEntryUpdated(productId,product);
                })
            );
        },
        onError(action: UpdateProductEntry,error: any){
            const productId:string = action.id;
            return of(new ProductEntryUpdateFail(productId,error));
        }
    })));
    //@Effect()
    setMainProduct$ = createEffect(()=>this.actions$.pipe(ofType(ProductEntriesActionTypes.SET_PRODUCT_MAIN_ENTRY),pessimisticUpdate({
        run:(action: SetProductMainEntry,state: ProductsState)=>{
            const productId:string = action.id;
            const productEntry:IProductEntry = action.payload;
            return this.productsService
            .setMainEntry(productId,productEntry)
            .pipe(
                map((product:IProduct)=>{
                    return new ProductMainEntrySet(productId,product);
                })
            );
        },
        onError(action: SetProductMainEntry,error: any){
            const productId:string = action.id;
            return of(new ProductMainEntryFailedToBeSet(productId,error));
        }
    })));
    constructor(
        private productsService: ProductEntriesService,
        private actions$:Actions
    ){}
}