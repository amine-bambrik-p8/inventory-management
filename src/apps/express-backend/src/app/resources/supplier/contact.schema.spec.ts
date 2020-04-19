import { Contact } from "./contact.schema";

describe("Contact schema",()=>{
    test("fields",()=>{
        const fields = Contact.obj;
        const expectedFields: String[]= [
            "firstName",
            "lastName",
            "phoneNumber",
            "email",
        ]
        const fieldsAsString = Object.keys(fields).sort().join(",");
        const expectedFieldsAsString = expectedFields.sort().join(",");
        expect(fieldsAsString).toBe(expectedFieldsAsString);
    });
    test("firstName", () => {
        const firstName = Contact.obj.firstName;
            expect(firstName).toEqual({
                type: String,
                
        });
    });
    test("lastName", () => {
        const lastName = Contact.obj.lastName;
            expect(lastName).toEqual({
                type: String,
                
        });
    });
    test("phoneNumber", () => {
        const phoneNumber = Contact.obj.phoneNumber;
            expect(phoneNumber).toEqual({
                type: String,
                
        });
    });
    test("email", () => {
        const email = Contact.obj.email;
            expect(email).toEqual({
                type: String,
                
        });
    });
})