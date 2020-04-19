import { OrderEntry } from "./order-entry.entity";
import { Schema } from 'mongoose';

describe("OrderEntity schema",()=>{
    test("fields",()=>{
        const fields = OrderEntry.obj;
        const expectedFields: String[]= [
            "quantity",
            "productEntryId",
        ]
        const fieldsAsString = Object.keys(fields).sort().join(",");
        const expectedFieldsAsString = expectedFields.sort().join(",");
        expect(fieldsAsString).toBe(expectedFieldsAsString);
    });
    test("quantity", () => {
        const quantity = OrderEntry.obj.quantity;
            expect(quantity).toEqual({
                type: Number,
                
        });
    });
    test("productEntryId", () => {
        const productEntryId = OrderEntry.obj.productEntryId;
            expect(productEntryId).toEqual({
                type: Schema.Types.ObjectId,
                
        });
    });
    
});