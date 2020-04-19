import { Supplier } from "./supplier.model";
import { Address } from '../common/address.entity';
import { Contact } from './contact.schema';

describe("Supplier model",()=>{
    describe("schema",()=>{
        test("fields",()=>{
            const fields = Supplier.schema.obj;
            const expectedFields: String[]= [
                "name",
                "contact",
                "picture",
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
        test("picture", () => {
            const picture = Supplier.schema.obj.picture;
                expect(picture).toEqual({
                    type: String,
                    
            });
        });
        test("address", () => {
            const address = Supplier.schema.obj.address;
                expect(address).toEqual({
                    type: Address,
                    
            });
        });
        test("contact", () => {
            const contact = Supplier.schema.obj.contact;
                expect(contact).toEqual({
                    type: Contact
                    
            });
        });
        
        
    });
});