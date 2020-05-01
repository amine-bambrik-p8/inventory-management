import { userValidation } from './user.validation';
import { roles } from './../model/role';
import { IUser, Role } from '@workspace/interfaces';
import * as faker from "faker";
describe("User validation",()=>{
    let someValidUser: IUser;
    beforeEach(()=>{
        someValidUser = {
            firstName:faker.name.firstName(),
            lastName:faker.name.lastName(),
            password:faker.internet.password(12),
            role:faker.random.arrayElement(roles) as Role,
            username:faker.internet.userName(),
        };
    });
    it("should succeed when a valid user is passed",()=>{
        const {error} = userValidation.validate(someValidUser);
        expect(error).toBeFalsy();
    });
    describe("password",()=>{
        it("should fail when its length is less than 8",()=>{
            const someUserWithInvalidPassword = {...someValidUser};
            someUserWithInvalidPassword.password = faker.internet.password(5);
            const {error} = userValidation.validate(someUserWithInvalidPassword);
            expect(error).toBeTruthy();
        });
        it("should fail when its length is greater than 32",()=>{
            const someUserWithInvalidPassword = {...someValidUser};
            someUserWithInvalidPassword.password = faker.internet.password(36);
            const {error} = userValidation.validate(someUserWithInvalidPassword);
            expect(error).toBeTruthy();
        });
    });
    describe("role",()=>{
        it("should fail when it's missing",()=>{
            const {role,...someUserWithoutRole} =someValidUser;
            const {error} = userValidation.validate(someUserWithoutRole);
            expect(error).toBeTruthy();
        });
        it("should fail when it's not a listed role",()=>{
            const someUserWithInvalidRole ={...someValidUser};
            (someUserWithInvalidRole as any).role = "sdqfd";
            const {error} = userValidation.validate(someUserWithInvalidRole);
            expect(error).toBeTruthy();
        });
    });
    describe("username",()=>{
        it("should fail when it's missing",()=>{
            const {username,...someUserWithoutUsername} = someValidUser;
            const {error} = userValidation.validate(someUserWithoutUsername);
            expect(error).toBeTruthy();
        })
    });
});