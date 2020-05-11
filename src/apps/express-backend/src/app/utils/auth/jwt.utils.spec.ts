import { IUserDocument } from './../../resources/user/model/user.model';
import { JwtAuth } from './jwt.auth';
import { connect,clearDatabase,closeDatabase } from '../../../test-db-setup';
import { User } from '../../resources/user/model/user.model';
import * as jwt from 'jsonwebtoken';
import { Role,IUser } from '@workspace/interfaces';
import { Request,Response } from "express";
describe("JwtAuth",()=>{
    let controller: JwtAuth;
    beforeEach(()=>{
        controller = new JwtAuth();
    })
    beforeAll(()=>{
        return connect();
    })
    
    afterAll(()=>{
        return closeDatabase();
    });
    afterEach(()=>{
        return clearDatabase();
    });
    describe("signIn",()=>{
        it("should return status 400 and error with message when username is not provided",async ()=>{
            expect.assertions(3);
            const req: Partial<Request> = {
                body:{
                    data:{
                        password:"somepassword",
                    },
                }
            };
            const res: Partial<Response>= {
                json(document): Response{
                    expect(document.error).toBeTruthy();
                    expect(document.error.message).toBeTruthy();
                    return this;
                },
                status(code): Response{
                    expect(code).toBe(400);
                    return this;
                }
            };
            await controller.signIn(req,res);
        });
        it("should return status 400 and error with message when password is not provided",async ()=>{
            expect.assertions(3);
            
            const req: Partial<Request>= {
                body:{
                    data:{
                        username:"someusername",
                    },
                }
            };
            const res: Partial<Response> = {
                json(document): Response{
                    expect(document.error).toBeTruthy();
                    expect(document.error.message).toBeTruthy();
                    return this;
                },
                status(code): Response{
                    expect(code).toBe(400);
                    return this;
                }
            };
            await controller.signIn(req,res);
        });
        it("should return status 401 and error with message when no user is matched",async ()=>{
            expect.assertions(3);
            const req: Partial<Request> = {
                body:{
                    data:{
                        username:"someusername",
                        password:"someotherpassword"
                    },
                }
            };
            const res: Partial<Response> = {
                json(document): Response{
                    expect(document.error).toBeTruthy();
                    expect(document.error.message).toBeTruthy();
                    return this;
                },
                status(code): Response{
                    expect(code).toBe(401);
                    return this;
                }
            };
            await controller.signIn(req,res);
        });
        it("should return status 401 and error with message when a user is matched but password doesn't",async ()=>{
            expect.assertions(3);
            const someUser:IUserDocument = await User.create({
                username:"someuserName",
                password:"somePassword",
                role:Role.ADMIN,
                lastName:"someLastName",
                firstName:"someFirstName",
            });
            const req:Partial<Request> = {
                body:{
                    data:{
                        username:"someusername",
                        password:"someotherpassword"
                    },
                }
            };
            const res:Partial<Response> = {
                json(document): Response{
                    expect(document.error).toBeTruthy();
                    expect(document.error.message).toBeTruthy();
                    return this;
                },
                status(code): Response{
                    expect(code).toBe(401);
                    return this;
                }
            };
            await controller.signIn(req,res);
        });
        it("should return 201 and a valid token when the user provides all the right coordinates",async ()=>{
            expect.assertions(6);
            const someUser:IUser ={
                username:"someuserName",
                password:"somePassword",
                role:Role.ADMIN,
                lastName:"someLastName",
                firstName:"someFirstName",
            };
            const id:string = (await User.create({...someUser}) as IUserDocument)._id.toHexString();
            const req: Partial<Request> = {
                body:{
                    data:{
                        ...someUser
                    },
                }
            };
            const res: Partial<Response> = {
                json(document): Response{
                    expect(document.data).toBeTruthy();
                    expect(document.data.token).toBeTruthy();
                    const decodedUser = jwt.decode(document.data.token);
                    expect(decodedUser.role).toEqual(someUser.role);
                    expect(decodedUser._id).toEqual(id);
                    expect(decodedUser.password).not.toBeTruthy();
                    return this;
                },
                status(code): Response{
                    expect(code).toBe(201);
                    return this;
                }
            };
            await controller.signIn(req,res);
        })
    });
    describe("authenticate",()=>{

        it("should return 401 status code and error with message when Authorization header is not provided",async ()=>{
            expect.assertions(3);
            const req:Partial<Request> = {
                headers:{
                }
            };
            const res:Partial<Response> = {
                json(document):Response{
                    expect(document.error).toBeTruthy();
                    expect(document.error.message).toBeTruthy();
                    return this;
                },
                status(code):Response{
                    expect(code).toBe(401);
                    return this
                }
            }
            await controller.authenticate(req,res,()=>{});
        });
        it("should return 401 status code and error with message when Authorization header doesn't start with Bearer",async ()=>{
            expect.assertions(3);
            const req: Partial<Request> = {
                headers:{
                    authorization:"something"
                }
            };
            const res: Partial<Response> = {
                json(document): Response{
                    expect(document.error).toBeTruthy();
                    expect(document.error.message).toBeTruthy();
                    return this;
                },
                status(code): Response{
                    expect(code).toBe(401);
                    return this
                }
            }
            await controller.authenticate(req,res,()=>{});
        });
        it("should add the user represented by the token to the request object",async ()=>{
            expect.assertions(2);
            const someUser: IUserDocument = await User.create({
                username:"someuserName",
                password:"somePassword",
                role:Role.ADMIN,
                lastName:"someLastName",
                firstName:"someFirstName",
            });
            const req: Partial<Request> = {
                headers:{
                    authorization:`Bearer ${someUser.jwtToken}`
                }
            };
            
            const res: Partial<Response>= {
            }
            const mockNext = jest.fn().mockImplementation();
            await controller.authenticate(req,res,mockNext);
            expect(mockNext).toHaveBeenCalledWith();
            expect((req as any).user).toEqual(someUser.toJSON());
        })
    });
})