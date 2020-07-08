import { OrdersState } from './orders.reducer';
import { OrdersService } from './../../orders/orders.service';
import { OrdersLoaded, OrdersActionTypes, LoadOrders, OrderCreated, CreateOrder, OrderUpdated, UpdateOrder, OrderDeleted, DeleteOrder, ReadOrder, OrderRead } from './orders.actions';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Effect, createEffect, ofType, Actions } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { IOrder } from '@workspace/interfaces';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
@Injectable({
    providedIn:"root"
})
export class OrdersEffects {
    //@Effect()
    loadOrders$ = createEffect(()=>this.actions$.pipe(ofType(OrdersActionTypes.LOAD_ORDERS),fetch({
        run:(action: LoadOrders,state: OrdersState)=>{
            return this.ordersService
            .readMany()
            .pipe(
                map((orders: IOrder[])=>{
                    return new OrdersLoaded(orders);
                })
            );
        },
        onError(action: LoadOrders,error: any){
            console.error(error);
        }
    })));
    createOrder$ = createEffect(()=>this.actions$.pipe(ofType(OrdersActionTypes.CREATE_ORDER),pessimisticUpdate({
        run:(action: CreateOrder,state: OrdersState)=>{
            return this.ordersService
            .createOne(action.payload)
            .pipe(
                map((order: IOrder)=>{
                    return new OrderCreated(order);
                })
            );
        },
        onError(action: CreateOrder,error: any){
            console.log(error);
        }
    })));
    updateClient$ = createEffect(()=>this.actions$.pipe(ofType(OrdersActionTypes.UPDATE_ORDER),pessimisticUpdate({
        run:(action:UpdateOrder,state: OrdersState)=>{
            const {_id:id,...changes} = action.payload;
            return this.ordersService
            .updateOne(id,changes)
            .pipe(
                map((order: IOrder)=>{
                    return new UpdateOrder(order);
                })
            );
        },
        onError(action: UpdateOrder,error: any){
            console.log(error);
        }
    })));
    deleteClient$ = createEffect(()=>this.actions$.pipe(ofType(OrdersActionTypes.DELETE_ORDER),pessimisticUpdate({
        run:(action: DeleteOrder,state: OrdersState)=>{
            return this.ordersService
            .deleteOne(action.payload._id)
            .pipe(
                map((order: IOrder)=>{
                    return new OrderDeleted(order);
                })
            )
        },
        onError(action: DeleteOrder,error){
            console.log(error);
        }
    })));
    //@Effect()
    readOrder$ = createEffect(()=>this.actions$.pipe(ofType(OrdersActionTypes.READ_ORDER),fetch({
        run:(action:ReadOrder,state:OrdersState)=>{
            return this.ordersService
            .readOne(action.payload)
            .pipe(
                map((category:IOrder)=>{
                    return new OrderRead(category)
                })
            );
        },
        onError(action: ReadOrder,error:any){
            console.error(error);
        }
    })));
    constructor(
        private ordersService: OrdersService,
        private actions$: Actions
    ){}
}