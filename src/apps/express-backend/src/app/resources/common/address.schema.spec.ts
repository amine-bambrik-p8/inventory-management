import { regex } from './../../utils/regex.utils';
import { Address } from "./address.schema";

describe("Address schema",()=>{
    test("fields",()=>{
        const fields = Address.obj;
        const expectedFields: String[]= [
            "address",
            "city",
            "zip"
        ]
        const fieldsAsString = Object.keys(fields).sort().join(",");
        const expectedFieldsAsString = expectedFields.sort().join(",");
        expect(fieldsAsString).toBe(expectedFieldsAsString);
    });
    test("city", () => {
        const city = Address.obj.city;
            expect(city).toEqual({
                type: String,
                required:true,
                maxlength:60,
                match:regex.address,
        });
    });
    test("address", () => {
        const address = Address.obj.address;
            expect(address).toEqual({
                type: String,
                required:true,
                maxlength:60,
                match:regex.address,
        });
    });
    test("zip", () => {
        const zip = Address.obj.zip;
            expect(zip).toEqual({
                type: String,
                required:true,
                maxlength:12,
                match:regex.zip
        });
    });
    
    
});