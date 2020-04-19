import { OrderEntry } from './order-entry.entity';
import { Address } from './../common/address.entity';
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
                    type: Date
                    
            });
        });
        test("orderStatus", () => {
            const orderStatus = Order.schema.obj.orderStatus;
                expect(orderStatus).toEqual({
                    type: String,
                    enum: [ ...orderStatusEnum]
            });
        });
        test("address", () => {
            const address = Order.schema.obj.address;
                expect(address).toEqual({
                    type: Address,
                    
            });
        });
        test("entries", () => {
            const entries = Order.schema.obj.entries;
                expect(entries).toEqual({
                    type: [OrderEntry],
                    
            });
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