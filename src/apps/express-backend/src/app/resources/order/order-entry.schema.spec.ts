import { OrderEntry } from "./order-entry.schema";
import { Schema } from 'mongoose';

describe("OrderEntry schema",()=>{
    test("fields",()=>{
        const fields = OrderEntry.obj;
        const expectedFields: String[]= [
            "quantity",
            "productEntry",
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
    test("productEntry", () => {
        const productEntry = OrderEntry.obj.productEntry;
            expect(productEntry).toEqual({
                type: Schema.Types.ObjectId,
                
        });
    });
    
});