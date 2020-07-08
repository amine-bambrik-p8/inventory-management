import { regex } from './../../../utils/regex.utils';
import { environment } from '../../../../environments/environment';
import { roles } from './role';
import {
  User
} from "./user.model";
import * as jwt from "jsonwebtoken";
import * as mongoose from "mongoose";
import { IUser, Role } from '@workspace/interfaces';
import {connect, closeDatabase, clearDatabase} from "../../../../test-db-setup";
describe("User model", () => {
    beforeAll(()=>{
        return connect();
    });
    afterAll(()=>{
        return closeDatabase();
    });
    afterEach(()=>{
        return clearDatabase();
    });
    
  describe("schema", () => {
    test("fields",()=>{
        const fields = User.schema.obj;
        const expectedFields: String[]= [
            "username",
            "firstName",
            "lastName",
            "password",
            "role",
            "picture",
            "_keys"
        ]
        
        const fieldsAsString = Object.keys(fields).sort().join(",");
        const expectedFieldsAsString = expectedFields.sort().join(",");
        expect(fieldsAsString).toBe(expectedFieldsAsString);
    });
    test("picture", () => {
        const picture = User.schema.obj.picture;
            expect(picture).toEqual({
                type: String,
        });
    });
    test("username", () => {
        const username = User.schema.obj.username;
            expect(username).toEqual({
                type: String,
                required:true,
                unique:true,
                maxlength:16,
                match:regex.username,
        });
    });
    test("firstName", () => {
        const firstName = User.schema.obj.firstName;
            expect(firstName).toEqual({
                type: String,
                required:true,
                maxlength:60,
                match:regex.name,
        });
    });
    test("lastName", () => {
        const lastName = User.schema.obj.lastName;
            expect(lastName).toEqual({
                type: String,
                required:true,
                maxlength:60,
                match:regex.name,
        });
    });
    test("password",()=>{
        const password = User.schema.obj.password;
        expect(password).toEqual({
            type:String,
            required:true,
        })
    })
    test("role", () => {
        const role = User.schema.obj.role;
            expect(role).toEqual({
                type: String,
                enum: [ ...roles ],
                required:true,
        });
    });
    describe("jwtToken",()=>{
        it("should exist as virtual",()=>{
            expect(User.schema.virtual("jwtToken")).toBeTruthy();
        });
        it("should be the signed _id and role",()=>{
            const spy = spyOn(jwt,"sign");
            const mockUser = {
                _id: mongoose.Types.ObjectId(),
                role:"ADMIN"
            }
            User.schema.virtual("jwtToken").applyGetters(mockUser,mockUser);
            expect(spy).toHaveBeenCalledWith({...mockUser},environment.jwt.secret,environment.jwt.options);
        });

    });
  });
  describe("isValidToken",()=>{
      it("should return true when token is valid",async ()=>{
          const someUser: IUser= {
            username:"someusername",
            firstName:"somefirstName",
            lastName:"somelastName",
            role:Role.INVENTORY,
            password:"somepassword",
          };
          const userDocument:any = new User(someUser);
          const result =await (User as any).isValidToken(userDocument.jwtToken);
          expect(result).toBeTruthy();
      });
      it("should return false when a simple string is provided",async ()=>{
          const someString = "something";
          const result =await (User as any).isValidToken(someString);
          expect(result).toBeFalsy();
      })
      it("should return false when token is not valid",async ()=>{
          const someToken = jwt.sign({id:"something"},"somesecret");
          const result = await (User as any).isValidToken(someToken);
          expect(result).toBeTruthy();
      });
  });
  describe("isValidPassword",()=>{
      it("should return false if the password doesn't",async ()=>{
        const somepassword = "somepassword";
        const someUser: IUser= {
            username:"someusername",
            firstName:"somefirstName",
            lastName:"somelastName",
            role:Role.INVENTORY,
            password:"someotherpassword",
          };
        const userDocument:any = await User.create(someUser);
        const result =await userDocument.isValidPassword(somepassword);
        expect(result).toBeFalsy();
      });
    it("should return true if the password doesn't",async ()=>{
        expect.assertions(1);
        const somepassword = "somepassword";
        const someUser: IUser= {
            username:"someusername",
            firstName:"somefirstName",
            lastName:"somelastName",
            role:Role.INVENTORY,
            password:somepassword,
          };
        const userDocument:any = await User.create(someUser);
        const result =await userDocument.isValidPassword(somepassword);
        expect(result).toBeTruthy();
    })
  })
});
