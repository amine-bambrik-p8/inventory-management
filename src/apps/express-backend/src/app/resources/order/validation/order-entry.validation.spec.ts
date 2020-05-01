import { orderEntryValidation } from './order-entry.validation';
import { IOrderEntry } from '@workspace/interfaces';
import * as faker from 'faker';
import * as mongoose from 'mongoose';
describe("Order Entry Validation",()=>{
    let someValidOrderEntry: IOrderEntry;
    beforeEach(()=>{
        someValidOrderEntry = {
            quantity: faker.random.number({
                min:1,
            }),
            productId: mongoose.Types.ObjectId().toHexString(),
        }
    })
    it("should succeed when a valid order entry is passed",()=>{
        const {error} = orderEntryValidation.validate(someValidOrderEntry);
        expect(error).toBeFalsy();
    });
    describe("quantity",()=>{
        it("should fail when it is missing",()=>{
            const {quantity,...someOrderEntryWithoutQuantity} = someValidOrderEntry;
            const {error} = orderEntryValidation.validate(someOrderEntryWithoutQuantity);
            expect(error).toBeTruthy();
        });
        it("should fail when it is less or equal to 0",()=>{
            const someOrderEntryWithInvalidQuantity = {...someValidOrderEntry};
            someOrderEntryWithInvalidQuantity.quantity = 0;
            const {error} = orderEntryValidation.validate(someOrderEntryWithInvalidQuantity);
            expect(error).toBeTruthy();
        });
    });
    describe("productId",()=>{
        it("should fail when it is missing",()=>{
            const {productId,...someOrderEntryWithoutProductId} = someValidOrderEntry;
            const {error} = orderEntryValidation.validate(someOrderEntryWithoutProductId);
            expect(error).toBeTruthy();
        });
        it("should fail when it is not a valid hex number",()=>{
            const someOrderEntryWithInvalidProductId = {...someValidOrderEntry};
            someOrderEntryWithInvalidProductId.productId = "m".repeat(24);
            const {error} = orderEntryValidation.validate(someOrderEntryWithInvalidProductId);
            expect(error).toBeTruthy();
        })
        it("should fail when its length is not equal to 24",()=>{
            const someOrderEntryWithInvalidProductIdLength = {...someValidOrderEntry};
            someOrderEntryWithInvalidProductIdLength.productId = "f".repeat(23);
            const {error} = orderEntryValidation.validate(someOrderEntryWithInvalidProductIdLength);
            expect(error).toBeTruthy();
        })
    })
});