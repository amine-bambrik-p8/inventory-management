import { ProductsState } from './products.reducer';
import { DataPersistence } from '@nrwl/nx';
import { ProductsService } from './../../products/products.service';
import { ProductsLoaded, ProductsActionTypes, LoadProducts, ProductCreated, CreateProduct, ProductDeleted, DeleteProduct, UpdateProduct, ProductUpdated } from './products.actions';
import { Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { IProduct } from '@workspace/interfaces';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn:"root",
})
export class ProductsEffects {
    @Effect()
    loadProducts$: Observable<ProductsLoaded> = this.dataPersistence.fetch(ProductsActionTypes.LOAD_PRODUCTS,{
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
    });
    @Effect()
    createProduct$: Observable<ProductCreated> = this.dataPersistence.fetch(ProductsActionTypes.CREATE_PRODUCT,{
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
    });
    @Effect()
    deleteProduct$: Observable<ProductDeleted> = this.dataPersistence.fetch(ProductsActionTypes.DELETE_PRODUCT,{
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
    });
    @Effect()
    updateProduct$: Observable<ProductUpdated> = this.dataPersistence.fetch(ProductsActionTypes.UPDATE_PRODUCT,{
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
    });
    constructor(
        private productsService: ProductsService,
        private dataPersistence: DataPersistence<ProductsState>
    ){}
}