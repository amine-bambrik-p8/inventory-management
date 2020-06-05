import { productValidation } from './product.validation';
import { IProduct } from '@workspace/interfaces';
import * as faker from 'faker';
import * as mongoose from 'mongoose';
describe("Product validation",()=>{
    let someValidProduct: IProduct;
    beforeEach(()=>{
        someValidProduct = {
            category: mongoose.Types.ObjectId().toHexString(),
            name:faker.commerce.product(),
            supplier:mongoose.Types.ObjectId().toHexString(),
            codebar:faker.random.number({
                min:Number.parseInt("1"+"0".repeat(7)),
                max:Number.parseInt("9".repeat(8)),
            }).toString(),
            quantityAlert:{
                minQuantity:faker.random.number({
                    min:0,
                    max: 50,     
                }),
                maxQuantity:faker.random.number({
                    min:51,
                }),
            },
            description:faker.lorem.paragraph(),
        };
    });
    it("should succeed when a valid product is passed",()=>{
        const {error} = productValidation.validate(someValidProduct);
        expect(error).toBeFalsy();
    });
    it("should succeed when no description,thumbnails,quantityAlert,codebar is given",()=>{
        const {description,thumbnails,quantityAlert,codebar,...someValidProductWithoutFields} = someValidProduct;
        const {error} = productValidation.validate(someValidProductWithoutFields);
        expect(error).toBeFalsy();
    })
    describe("codebar",()=>{
        it("should fail when it is not a number",()=>{
            const someProductWithInvalidCodebar = {...someValidProduct};
            someProductWithInvalidCodebar.codebar="sqada";
            const {error} = productValidation.validate(someProductWithInvalidCodebar);
            expect(error).toBeTruthy();
        });
    });
    describe("quantityAlert",()=>{
        it("should succeed when missing",()=>{
            const {quantityAlert,...someProductWithoutQuantityAlert} = someValidProduct;
            const {error} = productValidation.validate(someProductWithoutQuantityAlert);
            expect(error).toBeFalsy();
        });
        it("should fail when bought minQuantity and maxQuantity are missing",()=>{
            const someProductWithEmptyQuantityAlert = {...someValidProduct};
            someProductWithEmptyQuantityAlert.quantityAlert = {};
            const {error} = productValidation.validate(someProductWithEmptyQuantityAlert); 
            expect(error).toBeTruthy();
        });
    });
    describe("name",()=>{
        it("should fail when it is missing",()=>{
            const {name,...someProductWithoutName} = someValidProduct;
            const {error} = productValidation.validate(someProductWithoutName);
            expect(error).toBeTruthy();
        });
    });
    describe("supplier",()=>{
        it("should fail when missing",()=>{
            const {supplier,...someProductWithNoSupplier} = someValidProduct;
            const {error} = productValidation.validate(someProductWithNoSupplier);
            expect(error).toBeTruthy()
        });
        it("should fail when it is not a hex value",()=>{
            const someProductWithInvalidSupplier = {...someValidProduct};
            someProductWithInvalidSupplier.supplier ={id:"m".repeat(24),name:"somename"};
            const {error} = productValidation.validate(someProductWithInvalidSupplier);
            expect(error).toBeTruthy()
        })
        it("should fail when its length is not 24",()=>{
            const someProductWithInvalidSupplier = {...someValidProduct};
            someProductWithInvalidSupplier.supplier ={id:"f".repeat(23),name:"somename"};
            const {error} = productValidation.validate(someProductWithInvalidSupplier);
            expect(error).toBeTruthy()
        });
    });
    
});