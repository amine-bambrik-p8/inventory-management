import { ProductEntry } from './product-entry.schema';
import { Product } from "./product.model";
import { Schema } from 'mongoose';

describe("Product model",()=>{
    describe("schema",()=>{
        test("fields",()=>{
            const fields = Product.schema.obj;
            const expectedFields: String[]= [
                "codebar",
                "name",
                "mainEntryId",
                "minQuantity",
                "maxQuantity",
                "entries",
                "categoryId",
                "supplierId",
                'thumbnails',
                "description",
            ];
            const fieldsAsString = Object.keys(fields).sort().join(",");
            const expectedFieldsAsString = expectedFields.sort().join(",");
            expect(fieldsAsString).toBe(expectedFieldsAsString);
        });
        test("name", () => {
            const name = Product.schema.obj.name;
                expect(name).toEqual({
                    type: String,
                    required:true,
                    maxlength:60
            });
        });
        test("codebar", () => {
            const codebar = Product.schema.obj.codebar;
                expect(codebar).toEqual({
                    type: String,
                    unique:true,
                    maxlength:128
            });
        });
        test("mainEntryId", () => {
            const mainEntryId = Product.schema.obj.mainEntryId;
                expect(mainEntryId).toEqual({
                    type: Schema.Types.ObjectId,
            });
        });
        test("minQuantity", () => {
            const minQuantity = Product.schema.obj.minQuantity;
                expect(minQuantity).toEqual({
                    type: Number,
                    min:0,
                    
            });
        });
        test("maxQuantity", () => {
            const maxQuantity = Product.schema.obj.maxQuantity;
                expect(maxQuantity).toEqual({
                    type: Number,
                    
            });
        });
        test("categoryId", () => {
            const categoryId = Product.schema.obj.categoryId;
                expect(categoryId).toEqual({
                    type: Schema.Types.ObjectId,
                    ref: "category",
                    required:true,
            });
        });
        test("entries", () => {
            const entries = Product.schema.obj.entries;
                expect(entries.type).toEqual(
                    [ProductEntry],
             );
        });
        test("thumbnails", () => {
            const thumbnails = Product.schema.obj.thumbnails;
                expect(thumbnails).toEqual({
                    type: [String]
                    
            });
        });
        test("description", () => {
            const description = Product.schema.obj.description;
                expect(description).toEqual({
                    type: String,
                    maxlength:500,
            });
        });
        test("supplierId", () => {
            const supplierId = Product.schema.obj.supplierId;
                expect(supplierId).toEqual({
                    type: Schema.Types.ObjectId,
                    ref:"supplier",
                    required:true,
            });
        });
        
    });
});