import { regex } from './../../../utils/regex.utils';
import { Supplier } from "./supplier.model";
import { Address } from '../../common/address.schema';
import { Contact } from '../model/contact.schema'

describe("Supplier model",()=>{
    describe("schema",()=>{
        test("fields",()=>{
            const fields = Supplier.schema.obj;
            const expectedFields: String[]= [
                "name",
                "contact",
                "picture",
                "address",
                "_keys"
            ]
            const fieldsAsString = Object.keys(fields).sort().join(",");
            const expectedFieldsAsString = expectedFields.sort().join(",");
            expect(fieldsAsString).toBe(expectedFieldsAsString);
        });
        test("name", () => {
            const name = Supplier.schema.obj.name;
                expect(name).toEqual({
                    type: String,
                    required:true,
                    maxlength:60,
                    match:regex.alphanum,
            });
        });
        test("picture", () => {
            const picture = Supplier.schema.obj.picture;
                expect(picture).toEqual({
                    type: String,
                    maxlength:2000,
                    match:regex.uri,     
            });
        });
        test("address", () => {
            const address = Supplier.schema.obj.address;
                expect(address).toEqual({
                    type: Address,
                    required:true,
            });
        });
        test("contact", () => {
            const contact = Supplier.schema.obj.contact;
                expect(contact).toEqual({
                    type: Contact,
                    required:true
            });
        });
        
        
    });
});