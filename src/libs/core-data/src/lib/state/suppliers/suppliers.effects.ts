import { SuppliersState } from './suppliers.reducer';
import { DataPersistence } from '@nrwl/nx';
import { SuppliersService } from './../../suppliers/suppliers.service';
import { SuppliersLoaded, SuppliersActionTypes, LoadSuppliers, SupplierCreated, CreateSupplier, SupplierDeleted, DeleteSupplier, UpdateSupplier, SupplierUpdated } from './suppliers.actions';
import { Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { ISupplier } from '@workspace/interfaces';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn:"root",
})
export class SuppliersEffects {
    @Effect()
    loadSuppliers$: Observable<SuppliersLoaded> = this.dataPersistence.fetch(SuppliersActionTypes.LOAD_SUPPLIERS,{
        run:(action: LoadSuppliers,state: SuppliersState)=>{
            return this.suppliersService
            .readMany()
            .pipe(
                map((suppliers:ISupplier[])=>{
                    return new SuppliersLoaded(suppliers);
                })
            );
        },
        onError(action: LoadSuppliers,error: any){
            console.log(error);
        }
    });
    @Effect()
    createSupplier$: Observable<SupplierCreated> = this.dataPersistence.fetch(SuppliersActionTypes.CREATE_SUPPLIER,{
        run:(action: CreateSupplier,state: SuppliersState)=>{
            return this.suppliersService
            .createOne(action.payload)
            .pipe(
                map((supplier:ISupplier)=>{
                    return new SupplierCreated(supplier);
                })
            );
        },
        onError(action: CreateSupplier,error: any){
            console.log(error);
        }
    });
    @Effect()
    deleteSupplier$: Observable<SupplierDeleted> = this.dataPersistence.fetch(SuppliersActionTypes.DELETE_SUPPLIER,{
        run:(action: DeleteSupplier,state: SuppliersState)=>{
            return this.suppliersService
            .deleteOne(action.payload._id,)
            .pipe(
                map((supplier:ISupplier)=>{
                    return new SupplierDeleted(supplier);
                })
            );
        },
        onError(action: DeleteSupplier,error: any){
            console.log(error);
        }
    });
    @Effect()
    updateSupplier$: Observable<SupplierUpdated> = this.dataPersistence.fetch(SuppliersActionTypes.UPDATE_SUPPLIER,{
        run:(action: UpdateSupplier,state: SuppliersState)=>{
            const {_id:id,...changes} = action.payload;
            return this.suppliersService
            .updateOne(id,changes)
            .pipe(
                map((supplier:ISupplier)=>{
                    return new SupplierUpdated(supplier);
                })
            );
        },
        onError(action: UpdateSupplier,error: any){
            console.log(error);
        }
    });
    constructor(
        private suppliersService: SuppliersService,
        private dataPersistence: DataPersistence<SuppliersState>
    ){}
}