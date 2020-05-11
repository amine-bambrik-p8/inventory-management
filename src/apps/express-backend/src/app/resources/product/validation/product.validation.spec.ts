import { productValidation } from './product.validation';
import { IProduct } from '@workspace/interfaces';
import * as faker from 'faker';
import * as mongoose from 'mongoose';
describe("Product validation",()=>{
    let someValidProduct: IProduct;
    beforeEach(()=>{
        someValidProduct = {
            categoryId: mongoose.Types.ObjectId().toHexString(),
            name:faker.commerce.product(),
            supplierId:mongoose.Types.ObjectId().toHexString(),
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
            thumbnails:[faker.image.food()],
        };
    });
    it("should succeed when a valid product is passed",()=>{
        const {error} = productValidation.validate(someValidProduct);
        expect(error).toBeFalsy();
    });
    it("should succeed when no description,thumbnails,quantityAlert,codebar,categoryId is given",()=>{
        const {description,thumbnails,quantityAlert,codebar,categoryId,...someValidProductWithoutFields} = someValidProduct;
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
    describe("supplierId",()=>{
        it("should fail when missing",()=>{
            const {supplierId,...someProductWithNoSupplierId} = someValidProduct;
            const {error} = productValidation.validate(someProductWithNoSupplierId);
            expect(error).toBeTruthy()
        });
        it("should fail when it is not a hex value",()=>{
            const someProductWithInvalidSupplierId = {...someValidProduct};
            someProductWithInvalidSupplierId.supplierId ="m".repeat(24);
            const {error} = productValidation.validate(someProductWithInvalidSupplierId);
            expect(error).toBeTruthy()
        })
        it("should fail when its length is not 24",()=>{
            const someProductWithInvalidSupplierId = {...someValidProduct};
            someProductWithInvalidSupplierId.supplierId ="f".repeat(23);
            const {error} = productValidation.validate(someProductWithInvalidSupplierId);
            expect(error).toBeTruthy()
        });
    });
    
});