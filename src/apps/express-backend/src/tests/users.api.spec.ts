import { app } from '../main';
import { IUser, Role,} from '@workspace/interfaces';
import { IUserDocument, User } from '../app/resources/user/model/user.model';
import * as request from "supertest";
import { connect, clearDatabase, closeDatabase } from "../test-db-setup";
import * as path from "path";

describe("users API",()=>{
    let someAdminValidUser:IUser;
    let someInventoryValidUser: IUser; 
    let someCheckoutValidUser: IUser; 
    let someCheckoutValidUserDocument: IUserDocument;
    let someAdminValidUserDocument: IUserDocument;
    let someInventoryValidUserDocument: IUserDocument;
    let someUsers: IUser[];
    let someUsersDocument: IUserDocument[];
    let adminToken;
    let inventoryToken;
    let checkoutToken;
    const uri = '/users';
    beforeAll(()=>{
        return connect();
    });
    beforeEach(()=>{
        return clearDatabase();
    });
    afterAll(()=>{
        return closeDatabase();
    })
    beforeEach(async (done)=>{
        someAdminValidUser = {
            firstName:"someFirstName",
            lastName:"someLastName",
            role:Role.ADMIN,
            username:"username3",
            password:"somepassword"            
        };
        someInventoryValidUser = {
            firstName:"someFirstName",
            lastName:"someLastName",
            role:Role.INVENTORY,
            username:"username2",
            password:"somepassword"            
        };
        someCheckoutValidUser = {
            firstName:"someFirstName",
            lastName:"someLastName",
            role:Role.CHECKOUT,
            username:"username1",
            password:"somepassword"            
        };
        someAdminValidUserDocument = await User.create(someAdminValidUser);
        someInventoryValidUserDocument = await User.create(someInventoryValidUser);
        someCheckoutValidUserDocument = await User.create(someCheckoutValidUser);
        done();
    });
    beforeEach(async (done)=>{
        someUsers = [
            {
                firstName:"somefirstname",
                lastName:"somelastname",
                role:Role.INVENTORY,
                username:"username9",
                password:"somepasswrod"
            },
            {
                firstName:"somefirstname",
                lastName:"somelastname",
                role:Role.INVENTORY,
                username:"username10",
                password:"somepasswrod"
            },
        ];
        someUsersDocument = await User.create(someUsers);
        done();
    });
    beforeEach(async (done)=>{
        let loginRes =  await request(app).post("/sign-in").send({data:{username:someAdminValidUser.username,password:someAdminValidUser.password}});
        adminToken = loginRes.body.data.token;
        loginRes = await request(app).post("/sign-in").send({data:{username:someInventoryValidUser.username,password:someInventoryValidUser.password}});
        inventoryToken = loginRes.body.data.token;
        loginRes = await request(app).post("/sign-in").send({data:{username:someCheckoutValidUser.username,password:someCheckoutValidUser.password}});
        checkoutToken = loginRes.body.data.token;
        done()
    });
    describe("GET /",()=>{
        it("should require authentication",async ()=>{
            const response = await request(app).get(uri);
            expect(response.status).toBe(401);
        });
        it("should return users when authenticated",async(done)=>{
            const response = await request(app).get(uri).set('Authorization',"Bearer "+adminToken);
            expect(response.status).toBe(200);
            done();
        });
    });
    describe("GET /:id",()=>{
        it("should require authentication",async ()=>{
            const response = await request(app).get(path.join(uri,someUsersDocument[0]._id.toHexString()));
            expect(response.status).toBe(401);
        });
        it("should return the user when authenticated",async()=>{
            const response = await request(app).get(path.join(uri,someUsersDocument[0]._id.toHexString())).set('Authorization',"Bearer "+adminToken);
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body.data)).toEqual(JSON.stringify(someUsersDocument[0]));
        });
    });
    describe("POST /",()=>{
        it("should require authentication",async ()=>{
            const response = await request(app).post(uri).send({data:someUsers[0]});
            expect(response.status).toBe(401);
        });
        it("should require Admin role Auth",async ()=>{
            const someNewUser = {
                firstName:"somefirstname",
                lastName:"somelastname",
                role:Role.INVENTORY,
                username:"username8",
                password:"somepasswrod",
                
            };
            let response = await request(app).post(uri).send({data:someNewUser}).set('Authorization',"Bearer "+checkoutToken);
            expect(response.status).toBe(403);
            expect(response.body).toHaveProperty('error')
            response = await request(app).post(uri).send({data:someNewUser}).set('Authorization',"Bearer "+adminToken);
            expect(response.status).not.toBe(403);
            expect(response.body).toHaveProperty('data')
            
            response = await request(app).post(uri).send({data:someNewUser}).set('Authorization',"Bearer "+inventoryToken);
            expect(response.status).toBe(403);
            expect(response.body).toHaveProperty('error')

        });
        it("should return 201 with the new user as data when successful",async ()=>{
            const someNewUser: IUser = {
                firstName:"somefirstname",
                lastName:"somelastname",
                role:Role.INVENTORY,
                username:"username8",
                password:"somepasswrod"
            };
            const response = await request(app).post(uri).send({data:someNewUser}).set("Authorization","Bearer "+adminToken);
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("data");
                    
        });
    });

    describe("PUT /:id",()=>{
        it("should require authentication",async ()=>{
            const response = await request(app).put(uri).send({data:someUsers[0]});
            expect(response.status).toBe(401);
        });
        it("should require Inventory or Admin role Auth",async ()=>{
            let response = await request(app).put(path.join(uri,someUsersDocument[0]._id.toHexString())).send({data:someUsers[0]}).set('Authorization',"Bearer "+checkoutToken);
            expect(response.status).toBe(403);
            expect(response.body).toHaveProperty('error')
            response = await request(app).put(path.join(uri,someUsersDocument[0]._id.toHexString())).send({data:someUsers[0]}).set('Authorization',"Bearer "+adminToken);
            expect(response.status).not.toBe(403);
            expect(response.body).toHaveProperty('data')
            response = await request(app).put(path.join(uri,someUsersDocument[1]._id.toHexString())).send({data:someUsers[1]}).set('Authorization',"Bearer "+inventoryToken);
            expect(response.status).toBe(403);
            expect(response.body).toHaveProperty('error')
        });
        it("should return 200 with the new user as data when successful",async ()=>{
            const someNewUser: IUser = {
                firstName:"somefirstname",
                lastName:"somelastname",
                role:Role.INVENTORY,
                username:"newusername",
                password:"somepasswrod"
            };
            const response = await request(app).put(path.join(uri,someUsersDocument[0]._id.toHexString())).send({data:someNewUser}).set("Authorization","Bearer "+adminToken);
            expect(response.status).toBe(200);
            expect(response.body.data.username).toBe(someNewUser.username)
            expect(response.body.data._id).toBe(someUsersDocument[0]._id.toHexString());
        });
    });
    
    describe("DELETE /:id",()=>{
        it("should require authentication",async ()=>{
            const response = await request(app).del(uri).send({data:someUsers[0]});
            expect(response.status).toBe(401);
        });
        it("should require Inventory or Admin role Auth",async ()=>{
            let response = await request(app).del(path.join(uri,someUsersDocument[0]._id.toHexString())).set('Authorization',"Bearer "+checkoutToken);
            expect(response.status).toBe(403);
            expect(response.body).toHaveProperty('error')
            response = await request(app).del(path.join(uri,someUsersDocument[0]._id.toHexString())).set('Authorization',"Bearer "+adminToken);
            expect(response.status).not.toBe(403);
            expect(response.body).toHaveProperty('data')
            response = await request(app).del(path.join(uri,someUsersDocument[1]._id.toHexString())).set('Authorization',"Bearer "+inventoryToken);
            expect(response.status).toBe(403);
            expect(response.body).toHaveProperty('error')
        });
        it("should return 200 with the deleted user as data when successful",async ()=>{
            const response = await request(app).del(path.join(uri,someUsersDocument[1]._id.toHexString())).set("Authorization","Bearer "+adminToken);
            expect(response.status).toBe(200);
            expect(response.body.data._id).toBe(someUsersDocument[1]._id.toHexString());
        });
    });
});