import { IOrderEntry,OrderStatus } from '@workspace/interfaces';
import { OrderEntry } from './order-entry.schema';
import { Address } from '../../common/address.schema';
import { orderStatus as orderStatusEnum } from './order-status';
import { Order } from "./order.model";
import { Schema } from 'mongoose';
describe("Order model",()=>{
    describe("schema",()=>{
        test("fields",()=>{
            const fields = Order.schema.obj;
            const expectedFields: String[]= [
                "dateAndTimeOfOrder",
                "orderStatus",
                "address",
                "clientId",
                "entries"
            ]
            const fieldsAsString = Object.keys(fields).sort().join(",");
            const expectedFieldsAsString = expectedFields.sort().join(",");
            expect(fieldsAsString).toBe(expectedFieldsAsString);
        });
        test("dateAndTimeOfOrder", () => {
            const dateAndTimeOfOrder = Order.schema.obj.dateAndTimeOfOrder;
                expect(dateAndTimeOfOrder).toEqual({
                    type: Date,
                    default:Date.now,
                    
            });
        });
        test("orderStatus", () => {
            const orderStatus = Order.schema.obj.orderStatus;
                expect(orderStatus).toEqual({
                    type: String,
                    enum: [ ...orderStatusEnum],
                    required:true,
                    default:OrderStatus.DELIVERED,
            });
        });
        test("address", () => {
            const address = Order.schema.obj.address;
                expect(address).toEqual({
                    type: Address,
                    
            });
        });
        describe("entries",()=>{
            test("type", () => {
                const entries = Order.schema.obj.entries;
                    expect(entries.type).toEqual(
                        [OrderEntry],
                        );
            });
            it("should have validation and returns false when there's no entries",()=>{
                const emptyEntries: Partial<IOrderEntry>[]= [];
                const result = Order.schema.obj.entries.validate.validator(emptyEntries);
                expect(result).toBeFalsy();
            });
            it("should have validation and returns true when there's atleast one entry",()=>{
                const someEntry: Partial<IOrderEntry> = {}
                const someEntries: Partial<IOrderEntry>[] = [someEntry];
                const result =  Order.schema.obj.entries.validate.validator(someEntries);
                expect(result).toBeTruthy();
            })
        });
        test("clientId", () => {
            const clientId = Order.schema.obj.clientId;
                expect(clientId).toEqual({
                    type: Schema.Types.ObjectId,
                    ref: "client",
            });
        });
        
    });
});