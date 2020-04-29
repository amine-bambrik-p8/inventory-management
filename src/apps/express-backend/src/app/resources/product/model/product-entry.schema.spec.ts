import { ProductEntry } from './product-entry.schema';
describe("ProductEntry schema",()=>{
    test("fields",()=>{
        const fields = ProductEntry.obj;
        const expectedFields: String[]= [
            "dates",
            "boughtPrice",
            "price",
            "discount",
            "quantityInfo"
        ];
        const fieldsAsString = Object.keys(fields).sort().join(",");
        const expectedFieldsAsString = expectedFields.sort().join(",");
        expect(fieldsAsString).toBe(expectedFieldsAsString);
    });
    describe("dates",()=>{
        test("type", () => {
            const dates = ProductEntry.obj.dates;
                expect(dates.type).toEqual({
                        dateOfManufacturing:{
                            type:Date,
                            required:true,
                        },
                        dateOfExpiration:{
                            type:Date,
                            required:true,
                        }
            });
        });
        test("validation fail when dateOfManufacturing is greater than dateOfExpiration",()=>{
            const someDateOfManufacturing = new Date();
            const someDateOfExpiration = new Date(someDateOfManufacturing.getTime()-5000);
            const result = ProductEntry.obj.dates.validate.validator({
                dateOfManufacturing:someDateOfManufacturing,
                dateOfExpiration:someDateOfExpiration,
            });
            expect(result).toBeFalsy();
        });
        test("validation successful when dateOfExpiration is greater than dateOfManufacturing",()=>{
            const someDateOfManufacturing = new Date();
            const someDateOfExpiration = new Date(someDateOfManufacturing.getTime()+5000);
            const result = ProductEntry.obj.dates.validate.validator({
                dateOfManufacturing:someDateOfManufacturing,
                dateOfExpiration:someDateOfExpiration,
            });
            expect(result).toBeTruthy();
        });
    });
    test("boughtPrice", () => {
        const boughtPrice = ProductEntry.obj.boughtPrice;
            expect(boughtPrice).toEqual({
                type: Number,
                required:true,
                min:0,
        });
    });
    test("price", () => {
        const price = ProductEntry.obj.price;
            expect(price).toEqual({
                type: Number,
                required:true,
                min:0,
        });
    });
    test("discount", () => {
        const discount = ProductEntry.obj.discount;
            expect(discount).toEqual({
                type: Number,
                min:0,
                max:1,
                default:0,
        });
    });
    describe("quantityInfo",()=>{
        test("type", () => {
            const quantityInfo = ProductEntry.obj.quantityInfo;
            const {type:{soldQuantity:{validate,...soldQuantity},...rest}} = quantityInfo;
            expect({soldQuantity,...rest}).toEqual({
                soldQuantity:{
                    type:Number,
                    default:0,
                    required:true,
                   
                },
                checkedInQuantity:{
                    type:Number,
                    required:true,
                    min:1,
                },
            });

        });
        test("validation fail when sold is greater than checkedInQuantity",()=>{
            const result = ProductEntry.obj.quantityInfo.validate.validator({
                soldQuantity:60,
                checkedInQuantity:40
            });
            expect(result).toBeFalsy();
        });
        test("validation successful when checkedInQuantity is greater than soldQuantity",()=>{
            const result = ProductEntry.obj.quantityInfo.validate.validator({
                soldQuantity:20,
                checkedInQuantity:40
            });
            expect(result).toBeFalsy();
        });
        describe("soldQuantity",()=>{
            test("validation fail when it is equal to 0",()=>{
                const result = ProductEntry.obj.quantityInfo.type.soldQuantity.validate.validator(0);
                expect(result).toBeFalsy();
            });
            test("validation successful it is less than 0",()=>{
                const result = ProductEntry.obj.quantityInfo.type.soldQuantity.validate.validator(-1);
                expect(result).toBeTruthy();
            });
        })
        
    });
    
    describe("quantity",()=>{
        it("should exist", () => {
            const quantity = ProductEntry.virtualpath("quantity");
            expect(quantity).toBeTruthy();
        });
        it("should return the calculated quantity",() => {
            const checkedInQuantity = 50;
            const soldQuantity = 2;
            const expected = checkedInQuantity - soldQuantity;
            const value = {
                checkedInQuantity,
                soldQuantity,
            };
            const result = ProductEntry.virtualpath("quantity").applyGetters(value,value);
            expect(result).toEqual(expected);
        })
    });
    
});