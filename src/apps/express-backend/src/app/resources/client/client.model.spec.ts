import { Client } from "./client.model";
import { Address } from '../common/address.entity';

describe("Client model",()=>{
    describe("schema",()=>{
        test("fields",()=>{
            const fields = Client.schema.obj;
            const expectedFields: String[]= [
                "firstName",
                "lastName",
                "phoneNumber",
                "email",
                "address",
                "picture",
                "dateOfSubscription",
            ]
            const fieldsAsString = Object.keys(fields).sort().join(",");
            const expectedFieldsAsString = expectedFields.sort().join(",");
            expect(fieldsAsString).toBe(expectedFieldsAsString);
        });
        test("firstName", () => {
            const firstName = Client.schema.obj.firstName;
                expect(firstName).toEqual({
                    type: String,
                    
            });
        });
        test("lastName", () => {
            const lastName = Client.schema.obj.lastName;
                expect(lastName).toEqual({
                    type: String,
                    
            });
        });
        test("phoneNumber", () => {
            const phoneNumber = Client.schema.obj.phoneNumber;
                expect(phoneNumber).toEqual({
                    type: String,
                    
            });
        });
        test("email", () => {
            const email = Client.schema.obj.email;
                expect(email).toEqual({
                    type: String,
                    
            });
        });
        test("address", () => {
            const address = Client.schema.obj.address;
                expect(address).toEqual({
                    type: Address
                    
            });
        });
        test("dateOfSubscription", () => {
            const dateOfSubscription = Client.schema.obj.dateOfSubscription;
                expect(dateOfSubscription).toEqual({
                    type: Date
                    
            });
        });
        test("picture", () => {
            const picture = Client.schema.obj.picture;
                expect(picture).toEqual({
                    type: String,
                    
            });
        });
        
    });
});