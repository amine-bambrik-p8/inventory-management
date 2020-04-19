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
                "mainEntry",
                "minQuantity",
                "maxQuantity",
                "entries",
                "category",
                "supplier",
                'thumbnails',
                "description",
            ]
            const fieldsAsString = Object.keys(fields).sort().join(",");
            const expectedFieldsAsString = expectedFields.sort().join(",");
            expect(fieldsAsString).toBe(expectedFieldsAsString);
        });
        test("name", () => {
            const name = Product.schema.obj.name;
                expect(name).toEqual({
                    type: String,
                    
            });
        });
        test("codebar", () => {
            const codebar = Product.schema.obj.codebar;
                expect(codebar).toEqual({
                    type: String,
                    
            });
        });
        test("mainEntry", () => {
            const mainEntry = Product.schema.obj.mainEntry;
                expect(mainEntry).toEqual({
                    type: Schema.Types.ObjectId,
                    
            });
        });
        test("minQuantity", () => {
            const minQuantity = Product.schema.obj.minQuantity;
                expect(minQuantity).toEqual({
                    type: Number,
                    
            });
        });
        test("maxQuantity", () => {
            const maxQuantity = Product.schema.obj.maxQuantity;
                expect(maxQuantity).toEqual({
                    type: Number,
                    
            });
        });
        test("category", () => {
            const category = Product.schema.obj.category;
                expect(category).toEqual({
                    type: Schema.Types.ObjectId,
                    ref: "category",
                    
            });
        });
        test("entries", () => {
            const entries = Product.schema.obj.entries;
                expect(entries).toEqual({
                    type: [ProductEntry],
                    
            });
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
                    
            });
        });
        
        
    });
});