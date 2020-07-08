import { ProductEntry } from '../../product/model/product-entry.schema';
import { OrderEntry } from "./order-entry.schema";
import { regex } from './../../../utils/regex.utils';
import { Schema, model,Document} from 'mongoose';
import { Product, IProductDocument } from '../../product/model/product.model';
describe("OrderEntry schema",()=>{
    test("fields",()=>{
        const fields = OrderEntry.obj;
        const expectedFields: String[]= [
            "quantity",
            "product",
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
    test("product", () => {
        const productSchema:IProductDocument = Product.schema.obj;
        const {mainEntryId,entries,description,thumbnails,quantityAlert,...productSnapshot} = {...productSchema,entry:{type:ProductEntry,required:true}};
        const product = OrderEntry.obj.product;
            expect(product).toEqual({
                type: productSnapshot,
                required:true,
            });
    });
        
});