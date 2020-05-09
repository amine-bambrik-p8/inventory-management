import { OrdersActions, OrdersLoaded, OrderCreated, OrderDeleted, OrderUpdated } from './orders.actions';
import { ordersReducers,initialState, OrdersState } from "./orders.reducer";
import { IOrder, OrderStatus } from '@workspace/interfaces';

describe("orders reducer",()=>{
    let someOrders:IOrder[];
    let someInitState:OrdersState;
    beforeEach(()=>{
        someOrders = [
            {
                _id:"someId",
                entries:[

                ],
                clientId:"someClientId",
                address:{
                    address:"someAddress",
                    zip:"someZip",
                    city:"someCity"
                },
                dateAndTimeOfOrder:new Date(),
                orderStatus:OrderStatus.DELIVERED,
            },
            {
                _id:"someOtherId",
                entries:[

                ],
                clientId:"someClientId",
                address:{
                    address:"someAddress",
                    zip:"someZip",
                    city:"someCity"
                },
                dateAndTimeOfOrder:new Date(),
                orderStatus:OrderStatus.DELIVERED,
            },
        ];
        someInitState = {
            ids:someOrders.map(o=>o._id),
            entities:someOrders.reduce((obj,o)=>{
                obj[o._id]=o;
                return obj;
            },{})
        };
    });
    describe("default",()=>{
        it("should return init state",()=>{
            const someAction = {
                type:"something",
                payload:{}
            };
            const result = ordersReducers(undefined,someAction as OrdersActions);
            expect(result).toEqual(initialState)
        });
    });
    describe("Orders Loaded",()=>{
        it("should return a list of orders",()=>{
            const ordersLoaded = new OrdersLoaded(someOrders);
            const result = ordersReducers(undefined,ordersLoaded);
            expect(result.ids).toEqual(someOrders.map((o)=>o._id));
        });
    });
    describe("Order Created",()=>{
        it("should add the created order",()=>{
            const someOrder = someOrders[0];
            const orderCreated = new OrderCreated(someOrder);
            const result = ordersReducers(undefined,orderCreated);
            expect(result.entities).toHaveProperty(someOrder._id);
        });
    });
    describe("Order Deleted",()=>{
        it("should delete the passed order",()=>{
            const someOrder = someOrders[0];
            const orderDeleted = new OrderDeleted(someOrder);
            const result = ordersReducers(someInitState,orderDeleted);
            expect(result.entities).not.toHaveProperty(someOrder._id);
        });
    });
    describe("Order Updated",()=>{
        it("should update the passed order",()=>{
            const someOrder = someOrders[0];
            const someUpdate = {...someOrder,clientId:"someNewClientId"};
            const orderUpdated = new OrderUpdated(someUpdate);
            const result = ordersReducers(someInitState,orderUpdated);
            expect(result.entities[someOrder._id]).toEqual(someUpdate);
        });
    });
});