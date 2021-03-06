import { ICategoryDocument, Category } from './../app/resources/category/model/category.model';
import { app } from './../main';
import { IUser, Role, ICategory } from '@workspace/interfaces';
import { IUserDocument, User } from './../app/resources/user/model/user.model';
import * as request from "supertest";
import { connect, clearDatabase, closeDatabase } from "../test-db-setup";
import * as path from "path";
describe("categories API",()=>{
    let someAdminValidUser:IUser;
    let someInventoryValidUser: IUser; 
    let someCheckoutValidUser: IUser; 
    let someCheckoutValidUserDocument: IUserDocument;
    let someAdminValidUserDocument: IUserDocument;
    let someInventoryValidUserDocument: IUserDocument;
    let someCategories: ICategory[];
    let someCategoriesDocument: ICategoryDocument[];
    let adminToken;
    let inventoryToken;
    let checkoutToken;
    const uri = '/categories';
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
        someCategories = [
            {
                name:"someName",
            },
            {
                name:"someOtherName",
            }
        ];
        someCategoriesDocument = await Category.create(someCategories);
        
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
        it("should return categories when authenticated",async()=>{
            const response = await request(app).get(uri).set('Authorization',"Bearer "+adminToken);
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body.data)).toEqual(JSON.stringify(someCategoriesDocument.map((d)=>d.toJSON())));
            
        });
    });
    describe("GET /:id",()=>{
        it("should require authentication",async ()=>{
            const response = await request(app).get(path.join(uri,someCategoriesDocument[0]._id.toHexString()));
            expect(response.status).toBe(401);
        });
        it("should return the category when authenticated",async()=>{
            const response = await request(app).get(path.join(uri,someCategoriesDocument[0]._id.toHexString())).set('Authorization',"Bearer "+adminToken);
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body.data)).toEqual(JSON.stringify(someCategoriesDocument[0]));
        });
    });
    describe("POST /",()=>{
        it("should require authentication",async ()=>{
            const response = await request(app).post(uri).send({data:someCategories[0]});
            expect(response.status).toBe(401);
        });
        it("should require Inventory or Admin role Auth",async ()=>{
            let response = await request(app).post(uri).send({data:someCategories[0]}).set('Authorization',"Bearer "+checkoutToken);
            expect(response.status).toBe(403);
            expect(response.body).toHaveProperty('error')
            response = await request(app).post(uri).send({data:someCategories[0]}).set('Authorization',"Bearer "+adminToken);
            expect(response.status).not.toBe(403);
            expect(response.body).toHaveProperty('data')
            
            response = await request(app).post(uri).send({data:someCategories[1]}).set('Authorization',"Bearer "+inventoryToken);
            expect(response.status).not.toBe(403);
            expect(response.body).toHaveProperty('data')

        });
        it("should return 201 with the new category as data when successful",async ()=>{
            const someNewCategory: ICategory = {
                name:"someNewCategory"
            }
            const response = await request(app).post(uri).send({data:someNewCategory}).set("Authorization","Bearer "+adminToken);
            expect(response.status).toBe(201);
            expect(response.body.data.name).toBe(someNewCategory.name);
        });
    });

    describe("PUT /:id",()=>{
        it("should require authentication",async ()=>{
            const response = await request(app).put(uri).send({data:someCategories[0]});
            expect(response.status).toBe(401);
        });
        it("should require Inventory or Admin role Auth",async ()=>{
            let response = await request(app).put(path.join(uri,someCategoriesDocument[0]._id.toHexString())).send({data:someCategories[0]}).set('Authorization',"Bearer "+checkoutToken);
            expect(response.status).toBe(403);
            expect(response.body).toHaveProperty('error')
            response = await request(app).put(path.join(uri,someCategoriesDocument[0]._id.toHexString())).send({data:someCategories[0]}).set('Authorization',"Bearer "+adminToken);
            expect(response.status).not.toBe(403);
            expect(response.body).toHaveProperty('data')
            response = await request(app).put(path.join(uri,someCategoriesDocument[1]._id.toHexString())).send({data:someCategories[1]}).set('Authorization',"Bearer "+inventoryToken);
            expect(response.status).not.toBe(403);
            expect(response.body).toHaveProperty('data')
        });
        it("should return 200 with the new category as data when successful",async ()=>{
            const someNewCategory: ICategory = {
                name:"someOtherNewCategory"
            }
            const response = await request(app).put(path.join(uri,someCategoriesDocument[0]._id.toHexString())).send({data:someNewCategory}).set("Authorization","Bearer "+adminToken);
            expect(response.status).toBe(200);
            expect(response.body.data.name).toBe(someNewCategory.name);
        });
    });
    
    describe("DELETE /:id",()=>{
        it("should require authentication",async ()=>{
            const response = await request(app).del(uri).send({data:someCategories[0]});
            expect(response.status).toBe(401);
        });
        it("should require Inventory or Admin role Auth",async ()=>{
            let response = await request(app).del(path.join(uri,someCategoriesDocument[0]._id.toHexString())).set('Authorization',"Bearer "+checkoutToken);
            expect(response.status).toBe(403);
            expect(response.body).toHaveProperty('error')
            response = await request(app).del(path.join(uri,someCategoriesDocument[0]._id.toHexString())).set('Authorization',"Bearer "+adminToken);
            expect(response.status).not.toBe(403);
            expect(response.body).toHaveProperty('data')
            response = await request(app).del(path.join(uri,someCategoriesDocument[1]._id.toHexString())).set('Authorization',"Bearer "+inventoryToken);
            expect(response.status).not.toBe(403);
            expect(response.body).toHaveProperty('data')
        });
        it("should return 200 with the deleted category as data when successful",async ()=>{
            const response = await request(app).del(path.join(uri,someCategoriesDocument[1]._id.toHexString())).set("Authorization","Bearer "+adminToken);
            expect(response.status).toBe(200);
            expect(response.body.data.name).toBe(someCategoriesDocument[1].name);
        });
    });
});