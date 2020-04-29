import { ProductEntry } from '../../product/model/product-entry.schema';
import { OrderEntry } from "./order-entry.schema";

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
    describe("quantity", () => {
        test("type",()=>{
            const {validate,...quantity} = OrderEntry.obj.quantity;
                expect(quantity).toEqual({
                    type: Number,
                    required:true,
            });
        });
        it("should have validation that fails when value less or equal than 0",()=>{
            const someInvalidValue = 0;
            const result:Boolean = OrderEntry.obj.quantity.validate.validator(someInvalidValue);
            expect(result).toBeFalsy();
        })
    });
    test("productEntry", () => {
        const productEntry = OrderEntry.obj.productEntry;
            expect(productEntry).toEqual({
                type: ProductEntry,
                required:true,
            });
    });
        
});