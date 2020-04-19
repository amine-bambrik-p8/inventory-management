import { Address } from "./address.entity";

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
                
        });
    });
    test("address", () => {
        const address = Address.obj.address;
            expect(address).toEqual({
                type: String,
                
        });
    });
    test("zip", () => {
        const zip = Address.obj.zip;
            expect(zip).toEqual({
                type: String,
                
        });
    });
    
    
});