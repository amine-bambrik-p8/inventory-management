import { regex } from './../../../utils/regex.utils';
import { Category } from './category.model';
describe("Category model",()=>{
    describe("schema",()=>{
        test("fields",()=>{
            const fields = Category.schema.obj;
            const expectedFields: String[]= [
                "name",
                "_keys"
            ]
            const fieldsAsString = Object.keys(fields).sort().join(",");
            const expectedFieldsAsString = expectedFields.sort().join(",");
            expect(fieldsAsString).toBe(expectedFieldsAsString);
        });
        test("name", () => {
            const name = Category.schema.obj.name;
                expect(name).toEqual({
                    type: String,
                    required:true,
                    unique:true,
                    maxlength:60,
                    match:regex.alphanum
                    
            });
        });
        
    });
});