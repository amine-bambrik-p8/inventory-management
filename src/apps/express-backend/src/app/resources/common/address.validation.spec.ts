import { addressValidation } from './address.validation';
import { IAddress } from '@workspace/interfaces';
import * as faker from 'faker';
import { cpus } from 'os';
describe("Address Validation",()=>{
    let someValidAddress:IAddress;
    beforeEach(()=>{
        someValidAddress = {
            address:faker.address.streetAddress(),
            city:faker.address.city(),
            zip:faker.address.zipCode(),
        };
    });
    it("should succeed when address is valid",()=>{
        const {error} = addressValidation.validate(someValidAddress);
        expect(error).toBeFalsy();
    });
    describe("address",()=>{
        it("should fail when it is missing",()=>{
            const { address,...someAddressWithoutAddress } = someValidAddress;
            const { error } = addressValidation.validate(someAddressWithoutAddress);
            expect(error).toBeTruthy();
        });
    });
    describe("city",()=>{
        it("should fail when it is missing",()=>{
            const {city,...someAddressWithoutCity} = someValidAddress;
            const {error} = addressValidation.validate(someAddressWithoutCity);
            expect(error).toBeTruthy();
        });
    });
    describe("zip",()=>{
        it("should fail when it is missing",()=>{
            const {zip,...someAddressWithoutZip} = someValidAddress;
            const {error} = addressValidation.validate(someAddressWithoutZip);
            expect(error).toBeTruthy();
        });
        it("should fail when it doesn't match regex",()=>{
            const someAddressWithBadZip = {...someValidAddress};
            someAddressWithBadZip.zip = "sqfdsq";
            const {error} = addressValidation.validate(someAddressWithBadZip);
            expect(error).toBeTruthy();
        });
    });
})