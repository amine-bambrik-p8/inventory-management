import { OrdersState } from './orders.reducer';
import { DataPersistence } from '@nrwl/nx';
import { OrdersService } from './../../orders/orders.service';
import { OrdersLoaded, OrdersActionTypes, LoadOrders, OrderCreated, CreateOrder, OrderUpdated, UpdateOrder, OrderDeleted, DeleteOrder } from './orders.actions';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { IOrder } from '@workspace/interfaces';

@Injectable({
    providedIn:"root"
})
export class OrdersEffects {
    @Effect()
    loadOrders$: Observable<OrdersLoaded> = this.dataPersistence.fetch(OrdersActionTypes.LOAD_ORDERS,{
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
    });
    createOrder$: Observable<OrderCreated> = this.dataPersistence.pessimisticUpdate(OrdersActionTypes.CREATE_ORDER,{
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
    });
    updateClient$: Observable<OrderUpdated> = this.dataPersistence.pessimisticUpdate(OrdersActionTypes.UPDATE_ORDER,{
        run:(action:UpdateOrder,state: OrdersState)=>{
            return this.ordersService
            .updateOne(action.payload._id,action.payload)
            .pipe(
                map((order: IOrder)=>{
                    return new UpdateOrder(order);
                })
            );
        },
        onError(action: UpdateOrder,error: any){
            console.log(error);
        }
    });
    deleteClient$: Observable<OrderDeleted> = this.dataPersistence.pessimisticUpdate(OrdersActionTypes.DELETE_ORDER,{
        run:(action: DeleteOrder,state: OrdersState)=>{
            return this.ordersService
            .deleteOne(action.payload._id)
            .pipe(
                map((order: IOrder)=>{
                    return order;
                })
            )
        },
        onError(action: DeleteOrder,error){
            console.log(error);
        }
    });
    constructor(
        private ordersService: OrdersService,
        private dataPersistence: DataPersistence<OrdersState>
    ){}
}