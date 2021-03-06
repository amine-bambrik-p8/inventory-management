import { IClientDocument, Client } from '../app/resources/client/model/client.model';
import { app } from '../main';
import { IUser, Role, IClient } from '@workspace/interfaces';
import { IUserDocument, User } from '../app/resources/user/model/user.model';
import * as request from "supertest";
import { connect, clearDatabase, closeDatabase } from "../test-db-setup";
import * as path from "path";

describe("clients API",()=>{
    let someAdminValidUser:IUser;
    let someInventoryValidUser: IUser; 
    let someCheckoutValidUser: IUser; 
    let someCheckoutValidUserDocument: IUserDocument;
    let someAdminValidUserDocument: IUserDocument;
    let someInventoryValidUserDocument: IUserDocument;
    let someClients: IClient[];
    let someClientsDocument: IClientDocument[];
    let adminToken;
    let inventoryToken;
    let checkoutToken;
    const uri = '/clients';
    beforeAll(()=>{
        return connect();
    });
    beforeEach(()=>{
        return clearDatabase();
    });
    afterAll(()=>{
        return closeDatabase();
    })
    beforeEach(async ()=>{
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
        
    });
    beforeEach(async ()=>{
        someClients = [
            {
                firstName:"someFirstName",
                lastName:"someLastName",
                address:{
                    address:"someAddress",
                    city:"somecity",
                    zip:"13200"
                },
                email:"someemail@email.com",
                phoneNumber:"555-555-5555"
            },
            {
                firstName:"someOtherFirstName",
                lastName:"someOtherLastName",
                address:{
                    address:"someAddress",
                    city:"somecity",
                    zip:"13200"
                },
                email:"someotheremail@email.com",
                phoneNumber:"555-555-5554"
            },
        ];
        someClientsDocument = await Client.create(someClients);
        
    });
    beforeEach(async ()=>{
        let loginRes =  await request(app).post("/sign-in").send({data:{username:someAdminValidUser.username,password:someAdminValidUser.password}});
        adminToken = loginRes.body.data.token;
        loginRes = await request(app).post("/sign-in").send({data:{username:someInventoryValidUser.username,password:someInventoryValidUser.password}});
        inventoryToken = loginRes.body.data.token;
        loginRes = await request(app).post("/sign-in").send({data:{username:someCheckoutValidUser.username,password:someCheckoutValidUser.password}});
        checkoutToken = loginRes.body.data.token;
        
    });
    describe("GET /",()=>{
        it("should require authentication",async ()=>{
            const response = await request(app).get(uri);
            expect(response.status).toBe(401);
        });
        it("should return clients when authenticated",async(done)=>{
            const response = await request(app).get(uri).set('Authorization',"Bearer "+adminToken);
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body.data)).toEqual(JSON.stringify(someClientsDocument.map((d)=>d.toJSON())));
            done();
        });
    });
    describe("GET /:id",()=>{
        it("should require authentication",async ()=>{
            const response = await request(app).get(path.join(uri,someClientsDocument[0]._id.toHexString()));
            expect(response.status).toBe(401);
        });
        it("should return the client when authenticated",async()=>{
            const response = await request(app).get(path.join(uri,someClientsDocument[0]._id.toHexString())).set('Authorization',"Bearer "+adminToken);
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body.data)).toEqual(JSON.stringify(someClientsDocument[0]));
        });
    });
    describe("POST /",()=>{
        it("should require authentication",async ()=>{
            const response = await request(app).post(uri).send({data:someClients[0]});
            expect(response.status).toBe(401);
        });
        it("should require  Admin role Auth",async ()=>{
            let response = await request(app).post(uri).send({data:someClients[0]}).set('Authorization',"Bearer "+checkoutToken);
            expect(response.status).toBe(403);
            expect(response.body).toHaveProperty('error')
            response = await request(app).post(uri).send({data:someClients[0]}).set('Authorization',"Bearer "+adminToken);
            expect(response.status).not.toBe(403);
            expect(response.body).toHaveProperty('data')
            
            response = await request(app).post(uri).send({data:someClients[1]}).set('Authorization',"Bearer "+inventoryToken);
            expect(response.status).toBe(403);
            expect(response.body).toHaveProperty('error')

        });
        it("should return 201 with the new client as data when successful",async ()=>{
            const someNewClient: IClient = {
                firstName:"someNewFirstName",
                lastName:"someNewLastName",
                address:{
                    address:"someAddress",
                    city:"somecity",
                    zip:"13200"
                },
                email:"somenewemail@email.com",
                phoneNumber:"555-555-5556"
            }
            const response = await request(app).post(uri).send({data:someNewClient}).set("Authorization","Bearer "+adminToken);
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("data");
                    
        });
    });

    describe("PUT /:id",()=>{
        it("should require authentication",async ()=>{
            const response = await request(app).put(uri).send({data:someClients[0]});
            expect(response.status).toBe(401);
        });
        it("should require Admin role Auth",async ()=>{
            let response = await request(app).put(path.join(uri,someClientsDocument[0]._id.toHexString())).send({data:someClients[0]}).set('Authorization',"Bearer "+checkoutToken);
            expect(response.status).toBe(403);
            expect(response.body).toHaveProperty('error')
            response = await request(app).put(path.join(uri,someClientsDocument[0]._id.toHexString())).send({data:someClients[0]}).set('Authorization',"Bearer "+adminToken);
            expect(response.status).not.toBe(403);
            expect(response.body).toHaveProperty('data')
            response = await request(app).put(path.join(uri,someClientsDocument[1]._id.toHexString())).send({data:someClients[1]}).set('Authorization',"Bearer "+inventoryToken);
            expect(response.status).toBe(403);
            expect(response.body).toHaveProperty('error')
        });
        it("should return 200 with the new client as data when successful",async ()=>{
            const someNewClient: IClient = {
                firstName:"someNewFirstName",
                lastName:"someNewLastName",
                address:{
                    address:"someAddress",
                    city:"somecity",
                    zip:"13200"
                },
                email:"somenewemail@email.com",
                phoneNumber:"555-555-5556"
            }
            const response = await request(app).put(path.join(uri,someClientsDocument[0]._id.toHexString())).send({data:someNewClient}).set("Authorization","Bearer "+adminToken);
            expect(response.status).toBe(200);
            expect(response.body.data.firstName).toBe(someNewClient.firstName)
            expect(response.body.data._id).toBe(someClientsDocument[0]._id.toHexString());
        });
    });
    
    describe("DELETE /:id",()=>{
        it("should require authentication",async ()=>{
            const response = await request(app).del(uri).send({data:someClients[0]});
            expect(response.status).toBe(401);
        });
        it("should require Admin role Auth",async ()=>{
            let response = await request(app).del(path.join(uri,someClientsDocument[0]._id.toHexString())).set('Authorization',"Bearer "+checkoutToken);
            expect(response.status).toBe(403);
            expect(response.body).toHaveProperty('error')
            response = await request(app).del(path.join(uri,someClientsDocument[0]._id.toHexString())).set('Authorization',"Bearer "+adminToken);
            expect(response.status).not.toBe(403);
            expect(response.body).toHaveProperty('data')
            response = await request(app).del(path.join(uri,someClientsDocument[1]._id.toHexString())).set('Authorization',"Bearer "+inventoryToken);
            expect(response.status).toBe(403);
            expect(response.body).toHaveProperty('error')
        });
        it("should return 200 with the deleted client as data when successful",async ()=>{
            const response = await request(app).del(path.join(uri,someClientsDocument[1]._id.toHexString())).set("Authorization","Bearer "+adminToken);
            expect(response.status).toBe(200);
            expect(response.body.data._id).toBe(someClientsDocument[1]._id.toHexString());
        });
    });
});