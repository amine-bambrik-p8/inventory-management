import { Supplier } from "./supplier.model";
import { Address } from '../common/address.entity';

describe("Supplier model",()=>{
    describe("schema",()=>{
        test("fields",()=>{
            const fields = Supplier.schema.obj;
            const expectedFields: String[]= [
                "name",
                "firstName",
                "lastName",
                "picture",
                "phoneNumber",
                "email",
                "address"
            ]
            const fieldsAsString = Object.keys(fields).sort().join(",");
            const expectedFieldsAsString = expectedFields.sort().join(",");
            expect(fieldsAsString).toBe(expectedFieldsAsString);
        });
        test("name", () => {
            const name = Supplier.schema.obj.name;
                expect(name).toEqual({
                    type: String,
                    
            });
        });
        test("firstName", () => {
            const firstName = Supplier.schema.obj.firstName;
                expect(firstName).toEqual({
                    type: String,
                    
            });
        });
        test("lastName", () => {
            const lastName = Supplier.schema.obj.lastName;
                expect(lastName).toEqual({
                    type: String,
                    
            });
        });
        test("picture", () => {
            const picture = Supplier.schema.obj.picture;
                expect(picture).toEqual({
                    type: String,
                    
            });
        });
        test("phoneNumber", () => {
            const phoneNumber = Supplier.schema.obj.phoneNumber;
                expect(phoneNumber).toEqual({
                    type: String,
                    
            });
        });
        test("email", () => {
            const email = Supplier.schema.obj.email;
                expect(email).toEqual({
                    type: String,
                    
            });
        });
        test("address", () => {
            const address = Supplier.schema.obj.address;
                expect(address).toEqual({
                    type: Address,
                    
            });
        });
        
    });
});