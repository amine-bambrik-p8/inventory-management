import { regex } from './../../../utils/regex.utils';
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
                "quantityAlert",
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
                    maxlength:60,
                    match:regex.alphanum,
            });
        });
        test("codebar", () => {
            const codebar = Product.schema.obj.codebar;
                expect(codebar).toEqual({
                    type: String,
                    unique:true,
                    maxlength:regex.codebar.ean8.validLength,
                    match:regex.codebar.ean8.validChars,
            });
        });
        test("mainEntryId", () => {
            const mainEntryId = Product.schema.obj.mainEntryId;
                expect(mainEntryId).toEqual({
                    type: Schema.Types.ObjectId,
            });
        });
        describe("quantityAlert",()=>{
            test("minQuantity", () => {
                const minQuantity = Product.schema.obj.quantityAlert.type.minQuantity;
                    expect(minQuantity).toEqual({
                        type: Number,
                        min:0,
                        
                });
            });
            test("maxQuantity", () => {
                const maxQuantity = Product.schema.obj.quantityAlert.type.maxQuantity;
                    expect(maxQuantity).toEqual({
                        type: Number,
                        min:0,
                        
                });
            });
            test("validation should fail when minQuantity is greater than maxQuantity",()=>{
                const result = Product.schema.obj.quantityAlert.validate.validator({
                    minQuantity:6,
                    maxQuantity:2,
                });
                expect(result).toBeFalsy();
            });
            test("validation should succeed when minQuantity is missing",()=>{
                const result = Product.schema.obj.quantityAlert.validate.validator({
                    maxQuantity:2,
                });
                expect(result).toBeTruthy();
            });
            test("validation should succeed when maxQuantity is missing",()=>{
                const result = Product.schema.obj.quantityAlert.validate.validator({
                    minQuantity:2,
                });
                expect(result).toBeTruthy();
            });
        })
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
                    type: [{
                        path:{
                            type: String
                        }
                    }]
                    
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