import { contactValidation } from './contact.validation';
import { IContact } from '@workspace/interfaces';
import * as faker from 'faker'
describe("Contact validation",()=>{
    let someValidContact: IContact;
    beforeAll(()=>{
        someValidContact = {
            email: faker.internet.email(),
            firstName:faker.name.firstName(),
            lastName:faker.name.lastName(),
            phoneNumber:faker.phone.phoneNumberFormat(0),
        };
    });
    it("should succeed when a valid contact is passed",()=>{
        const {error} = contactValidation.validate(someValidContact);
        expect(error).toBeFalsy();
    });
    describe("email",()=>{
        it("should fail when missing",()=>{
            const {email,...someContactWithoutEmail} = someValidContact;
            const {error} = contactValidation.validate(someContactWithoutEmail);
            expect(error).toBeTruthy();
        });
    });
    describe("firstName",()=>{
        it("should fail when missing",()=>{
            const {firstName, ...someContactWithoutFirstName} = someValidContact;
            const {error} = contactValidation.validate(someContactWithoutFirstName);
            expect(error).toBeTruthy();
        });
        it("should fail when it contains numbers",()=>{
            const someContactWithInvalidFirstName = {...someValidContact};
            someContactWithInvalidFirstName.firstName = "dsfqs1235sqfsq";
            const {error} = contactValidation.validate(someContactWithInvalidFirstName);
            expect(error).toBeTruthy();
        })
    });
    describe("lastName",()=>{
        it("should fail when missing",()=>{
            const {lastName, ...someContactWithoutLastName} = someValidContact;
            const {error} = contactValidation.validate(someContactWithoutLastName);
            expect(error).toBeTruthy();
        });
        it("should fail when it contains numbers",()=>{
            const someContactWithInvalidLastName = {...someValidContact};
            someContactWithInvalidLastName.lastName = "dsfqs1235sqfsq";
            const {error} = contactValidation.validate(someContactWithInvalidLastName);
            expect(error).toBeTruthy();
        });
    });
    describe("phoneNumber",()=>{
        it("should fail when it is missing",()=>{
            const {phoneNumber,...someContactWithoutPhone}=someValidContact;
            const {error} = contactValidation.validate(someContactWithoutPhone);
            expect(error).toBeTruthy();
        });
        it("should fail when it contains letters",()=>{
            const someContactWithInvalidPhone = {...someValidContact};
            someContactWithInvalidPhone.phoneNumber = "dsfqs1235sqfsq";
            const {error} = contactValidation.validate(someContactWithInvalidPhone);
            expect(error).toBeTruthy();
        });
    });
});