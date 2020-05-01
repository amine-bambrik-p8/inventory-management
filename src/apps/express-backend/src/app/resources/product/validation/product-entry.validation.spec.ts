import { prodcutEntryValidation } from './product-entry.validation';
import { IProductEntry } from '@workspace/interfaces';
import * as faker from "faker"

describe("Product Entry Validation",()=>{
    let someValidProductEntry: IProductEntry;
    beforeEach(()=>{
        someValidProductEntry = {
            quantityInfo:{
                checkedInQuantity:faker.random.number({
                    min:1,
                }),
            },
            boughtPrice:faker.random.number({
                min:0
            }),
            dates:{
                dateOfExpiration:faker.date.past(),
                dateOfManufacturing:faker.date.future(),
            },
            discount:faker.random.number({
                min:0,
                max:1,
            }),
            price:faker.random.number({
                min:0
            }),
        }
    });
    it("should succeed when a valid entry is passed",()=>{
        const {error} = prodcutEntryValidation.validate(someValidProductEntry);
        expect(error).toBeFalsy();
    });
    describe("boughtPrice",()=>{
        it("should fail when it is missing",()=>{
            const {boughtPrice,...someProductEntryWithoutBoughtPrice} = someValidProductEntry;
            const {error} = prodcutEntryValidation.validate(someProductEntryWithoutBoughtPrice);
            expect(error).toBeTruthy();
        });
        it("should fail if it's less or equal",()=>{
            const someProductEntryWithInvalidBoughtPrice = {...someValidProductEntry};
            someProductEntryWithInvalidBoughtPrice.boughtPrice=-1;
            const {error} = prodcutEntryValidation.validate(someProductEntryWithInvalidBoughtPrice);
            expect(error).toBeTruthy();
        });
    });
   describe("dates",()=>{
       it("should fail if doesn't include dateOfManufacturing",()=>{
           const someProductEntryWithoutDateOfManufacturing:any = {...someValidProductEntry};
           someProductEntryWithoutDateOfManufacturing.dates = {dateOfExpiration:someValidProductEntry.dates.dateOfExpiration};
           const {error} = prodcutEntryValidation.validate(someProductEntryWithoutDateOfManufacturing);
           expect(error).toBeTruthy();
       });
       it("should fail if doesn't include dateOfExpiration",()=>{
        const someProductEntryWithoutDateOfManufacturing:any = {...someValidProductEntry};
        someProductEntryWithoutDateOfManufacturing.dates = {dateOfManufacturing:someValidProductEntry.dates.dateOfManufacturing};
        const {error} = prodcutEntryValidation.validate(someProductEntryWithoutDateOfManufacturing);
        expect(error).toBeTruthy();
    });
   });
   it("should succeed when dates,discount or price is missing",()=>{
        const {dates,discount,...someProductEntryWithoutFields} = someValidProductEntry;
        const {error} = prodcutEntryValidation.validate(someProductEntryWithoutFields);
        expect(error).toBeFalsy();
    });
});