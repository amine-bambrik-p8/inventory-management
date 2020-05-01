import { IClient } from '@workspace/interfaces';
import * as faker from "faker";
import { clientValidation } from './client.validation';
describe("Client validation",()=>{
    let someValidClient: IClient;
    beforeEach(()=>{
        someValidClient = {
            firstName:faker.name.firstName(),
            lastName:faker.name.lastName(),
            phoneNumber:faker.phone.phoneNumberFormat(0),
            address:{
                address:faker.address.streetAddress(),
                city:faker.address.city(),
                zip:faker.address.zipCode(),
            },
            email:faker.internet.email(),
        }
    });
    it("should secceed when valid client is passed",()=>{
        const {error} = clientValidation.validate(someValidClient);
        expect(error).toBeFalsy();
    });
    describe("firstName",()=>{
        it("should fail when it is missing",()=>{
            const {firstName,...someClientWithoutFirstName} = someValidClient;
            const {error} = clientValidation.validate(someClientWithoutFirstName);
            expect(error).toBeTruthy();
        });
        it("should fail when it doesn't match regex",()=>{
            const someClientWithBadFirstName = {...someValidClient};
            someClientWithBadFirstName.firstName = "somehting123 something 23";
            const {error} = clientValidation.validate(someClientWithBadFirstName);
            expect(error).toBeTruthy();
        });
    });
    describe("lastName",()=>{
        it("should fail when it is missing",()=>{
            const {lastName,...someClientWithoutLastName } = someValidClient;
            const {error} = clientValidation.validate(someClientWithoutLastName);
            expect(error).toBeTruthy();
        });
        it("should fail when it doesn't match regex",()=>{
            const someClientWithBadLastName = {...someValidClient};
            someClientWithBadLastName.lastName = "somehting123 something 23";
            const {error} = clientValidation.validate(someClientWithBadLastName);
            expect(error).toBeTruthy();
        });
    });
    describe("phoneNumber",()=>{
        it("should fail when it is missing",()=>{
            const {phoneNumber,...someClientWithoutPhoneNumber} = someValidClient;
            const {error} = clientValidation.validate(someClientWithoutPhoneNumber);
            expect(error).toBeTruthy();
        })
        it("should fail when it doesn't match regex",()=>{
            const someClientWithBadPhoneNumber = {...someValidClient};
            someClientWithBadPhoneNumber.phoneNumber = "something";
            const {error} = clientValidation.validate(someClientWithBadPhoneNumber); 
        });
    });
    describe("email",()=>{
        it("should fail when it is missing",()=>{
            const {email,...someClientWithoutEmail}=someValidClient;
            const {error} = clientValidation.validate(someClientWithoutEmail);
            expect(error).toBeTruthy();
        });
        it("should fail when it's not a valid email",()=>{
            const someClientWithBadEmail = {...someValidClient};
            someClientWithBadEmail.email="somebademail";
            const {error} = clientValidation.validate(someClientWithBadEmail);
            expect(error).toBeTruthy();
        });
    });
    describe("address",()=>{
        it("should fail when it is missing",()=>{
            const {email,...someClientWithoutEmail} = someValidClient;
            const {error} = clientValidation.validate(someClientWithoutEmail);
        });
    })
})