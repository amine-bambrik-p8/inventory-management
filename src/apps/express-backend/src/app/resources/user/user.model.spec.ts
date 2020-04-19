import { roles } from './role';
import {
  User
} from "./user.model";

describe("User model", () => {
  describe("schema", () => {
    test("fields",()=>{
        const fields = User.schema.obj;
        const expectedFields: String[]= [
            "username",
            "firstName",
            "lastName",
            "password",
            "role",
        ]
        const fieldsAsString = Object.keys(fields).sort().join(",");
        const expectedFieldsAsString = expectedFields.sort().join(",");
        expect(fieldsAsString).toBe(expectedFieldsAsString);
    });
    test("username", () => {
        const username = User.schema.obj.username;
            expect(username).toEqual({
                type: String,
        });
    });
    test("firstName", () => {
        const firstName = User.schema.obj.firstName;
            expect(firstName).toEqual({
                type: String,
        });
    });
    test("lastName", () => {
        const lastName = User.schema.obj.lastName;
            expect(lastName).toEqual({
                type: String,
                
        });
    });
    test("role", () => {
        const role = User.schema.obj.role;
            expect(role).toEqual({
                type: String,
                enum: [ ...roles ],
        });
    });
  });
});
