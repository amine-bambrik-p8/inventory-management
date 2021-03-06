import { regex } from './../../../utils/regex.utils';
import { Client } from "./client.model";
import { Address } from '../../common/address.schema';

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
                "_keys"
            ]
            const fieldsAsString = Object.keys(fields).sort().join(",");
            const expectedFieldsAsString = expectedFields.sort().join(",");
            expect(fieldsAsString).toBe(expectedFieldsAsString);
        });
        test("firstName", () => {
            const firstName = Client.schema.obj.firstName;
                expect(firstName).toEqual({
                    type: String,
                    required:true,
                    maxlength:60,
                    match:regex.name,
            });
        });
        test("lastName", () => {
            const lastName = Client.schema.obj.lastName;
                expect(lastName).toEqual({
                    type: String,
                    required:true,
                    maxlength:60,
                    match:regex.name,
            });
        });
        test("phoneNumber", () => {
            const phoneNumber = Client.schema.obj.phoneNumber;
                expect(phoneNumber).toEqual({
                    type: String,
                    required:true,
                    match:regex.phone,
            });
        });
        test("email", () => {
            const email = Client.schema.obj.email;
                expect(email).toEqual({
                    type: String,
                    required:true,
                    unique:true,
                    maxlength:321,
                    match:regex.email,
            });
        });
        test("address", () => {
            const address = Client.schema.obj.address;
                expect(address).toEqual({
                    type: Address,
                    required:true,
            });
        });
        test("dateOfSubscription", () => {
            const dateOfSubscription = Client.schema.obj.dateOfSubscription;
                expect(dateOfSubscription).toEqual({
                    type: Date,
                    default:Date.now,
            });
        });
        test("picture", () => {
            const picture = Client.schema.obj.picture;
                expect(picture).toEqual({
                    type: String,
                    maxlength:2000,
                    match:regex.uri,
            });
        });
        
    });
});