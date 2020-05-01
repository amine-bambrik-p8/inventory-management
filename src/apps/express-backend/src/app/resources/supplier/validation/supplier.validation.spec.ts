import { supplierValidation } from './supplier.validation';
import { ISupplier } from "@workspace/interfaces";
import * as faker from "faker";
describe("Supplier Validation",()=>{
    let someValidSupplier: ISupplier;
    beforeEach(()=>{
        someValidSupplier = {
            address:{
                address:faker.address.streetAddress(),
                city:faker.address.city(),
                zip:faker.address.zipCode(),
            },
            contact:{
                email:faker.internet.email(),
                firstName:faker.name.firstName(),
                lastName:faker.name.lastName(),
                phoneNumber:faker.phone.phoneNumberFormat(0),
            },
            name:faker.company.companyName(),
        };
    });
    it("should succeed when a valid supplier is passed",()=>{
        const {error} = supplierValidation.validate(someValidSupplier);
        expect(error).toBeFalsy();
    });
    describe("address",()=>{
        it("should fail when it is missing",()=>{
            const {address,...someSupplierWithoutAddress} = someValidSupplier;
            const {error} = supplierValidation.validate(someSupplierWithoutAddress);
            expect(error).toBeTruthy();
        });
    });
    describe("contact",()=>{
        it("should fail when it is missing",()=>{
            const {contact,...someSupplierWithoutContact} = someValidSupplier;
            const {error} = supplierValidation.validate(someSupplierWithoutContact);
            expect(error).toBeTruthy();
        });
    });
    describe("name",()=>{
        it("should fail when it is missing",()=>{
            const {name,...someSupplierWithoutName} = someValidSupplier;
            const {error} = supplierValidation.validate(someSupplierWithoutName);
            expect(error).toBeTruthy();
        });     
    });
    
});