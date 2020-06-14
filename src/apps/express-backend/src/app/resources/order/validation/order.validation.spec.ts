import { orderValidation } from './order.validation';
import { IOrder, OrderStatus } from "@workspace/interfaces";
import * as faker from "faker";
import * as mongoose from "mongoose";
describe("Order Validation",()=>{
    let someValidOrder:IOrder;
    beforeEach(()=>{
        someValidOrder = {
            entries:[
                {
                    quantity:faker.random.number({
                        min:1,
                    }),
                    productId:mongoose.Types.ObjectId().toHexString(),
                }
            ],
            address:{
                address:faker.address.streetAddress(),
                city:faker.address.city(),
                zip:faker.address.zipCode(),
            },
            orderStatus:OrderStatus.PENDING,
            client:{
                id:mongoose.Types.ObjectId().toHexString(),
            },
        };
    });
    it("should succeed when valid order is passed",()=>{
        const {error} = orderValidation.validate(someValidOrder);
        expect(error).toBeFalsy();
    });
    it("should succeed when no address,orderStatus or clientId ",()=>{
        const {address,orderStatus,client,...someValidOrderWithOnlyRequired} = someValidOrder;
        const {error} = orderValidation.validate(someValidOrderWithOnlyRequired);
        expect(error).toBeFalsy();
    });
    describe("entries",()=>{
        it("should fail if there's no entries",()=>{
            const someOrderWithNoEntries = {...someValidOrder};
            someOrderWithNoEntries.entries=[];
            const {error} = orderValidation.validate(someOrderWithNoEntries);
            expect(error).toBeTruthy();
        });
        it("should fail if it is missing",()=>{
            const {entries,...someOrderWithoutEntriesField} = someValidOrder;
            const {error} = orderValidation.validate(someOrderWithoutEntriesField);
            expect(error).toBeTruthy();
        });
    });
    describe("orderStatus",()=>{
        it("should fail when it is not an allowed value",()=>{
            const someOrderWithInvalidOrderStatus = {...someValidOrder};
            (someOrderWithInvalidOrderStatus as any).orderStatus = "hello";
            const {error} = orderValidation.validate(someOrderWithInvalidOrderStatus);
            expect(error).toBeTruthy();
        });
    });
    describe("clientId",()=>{
        it("should fail when it's not a hex value",()=>{
            const someOrderWithInvalidClientId = {...someValidOrder};
            someOrderWithInvalidClientId.client.id = "m".repeat(24);
            const {error} = orderValidation.validate(someOrderWithInvalidClientId);
            expect(error).toBeTruthy();
        });
        it("should fail when its length is not equal to 24",()=>{
            const someOrderWithInvalidLength =  {...someValidOrder};
            someOrderWithInvalidLength.client.id = "f".repeat(23);
        });
    });
});