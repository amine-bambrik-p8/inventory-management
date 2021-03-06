import { ProductsState } from './products.reducer';
import { ProductsService } from '../../products/products.service';
import { ProductsLoaded, ProductsActionTypes, LoadProducts, ProductCreated, CreateProduct, ProductDeleted, DeleteProduct, UpdateProduct, ProductUpdated, ProductRead, ReadProduct } from './products.actions';
import { Effect, Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { IProduct } from '@workspace/interfaces';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
@Injectable({
    providedIn:"root",
})
export class ProductsEffects {
    //@Effect()
    loadProducts$ = createEffect(()=>this.actions$.pipe(ofType(ProductsActionTypes.LOAD_PRODUCTS),fetch({
        run:(action: LoadProducts,state: ProductsState)=>{
            return this.productsService
            .readMany()
            .pipe(
                map((products:IProduct[])=>{
                    return new ProductsLoaded(products);
                })
            );
        },
        onError(action: LoadProducts,error: any){
            console.log(error);
        }
    })));
    //@Effect()
    createProduct$ = createEffect(()=>this.actions$.pipe(ofType(ProductsActionTypes.CREATE_PRODUCT),pessimisticUpdate({
        run:(action: CreateProduct,state: ProductsState)=>{
            return this.productsService
            .createOne(action.payload)
            .pipe(
                map((product:IProduct)=>{
                    return new ProductCreated(product);
                })
            );
        },
        onError(action: CreateProduct,error: any){
            console.log(error);
        }
    })));
    //@Effect()
    deleteProduct$ = createEffect(()=>this.actions$.pipe(ofType(ProductsActionTypes.DELETE_PRODUCT),pessimisticUpdate({
        run:(action: DeleteProduct,state: ProductsState)=>{
            return this.productsService
            .deleteOne(action.payload._id)
            .pipe(
                map((product:IProduct)=>{
                    return new ProductDeleted(product);
                })
            );
        },
        onError(action: DeleteProduct,error: any){
            console.log(error);
        }
    })));
    //@Effect()
    updateProduct$ = createEffect(()=>this.actions$.pipe(ofType(ProductsActionTypes.UPDATE_PRODUCT),pessimisticUpdate({
        run:(action: UpdateProduct,state: ProductsState)=>{
            const {_id:id,...changes} = action.payload;
            return this.productsService
            .updateOne(id,changes)
            .pipe(
                map((product:IProduct)=>{
                    return new ProductUpdated(product);
                })
            );
        },
        onError(action: UpdateProduct,error: any){
            console.log(error);
        }
    })));
    //@Effect()
    readProduct$ = createEffect(()=>this.actions$.pipe(ofType(ProductsActionTypes.READ_PRODUCT),fetch({
        run:(action:ReadProduct,state:ProductsState)=>{
            return this.productsService
            .readOne(action.payload)
            .pipe(
                map((category:IProduct)=>{
                    return new ProductRead(category)
                })
            );
        },
        onError(action: ReadProduct,error:any){
            console.error(error);
        }
    })));
    constructor(
        private productsService: ProductsService,
        private actions$:Actions
    ){}
}