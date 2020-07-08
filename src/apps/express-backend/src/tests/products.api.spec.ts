import { Category } from './../app/resources/category/model/category.model';
import { IProductDocument, Product } from '../app/resources/product/model/product.model';
import { app } from '../main';
import { IUser, Role, IProduct, ICategory, ISupplier } from '@workspace/interfaces';
import { IUserDocument, User } from '../app/resources/user/model/user.model';
import * as request from "supertest";
import { connect, clearDatabase, closeDatabase } from "../test-db-setup";
import * as path from "path";
import * as mongoose from "mongoose";
import { ICategoryDocument } from '../app/resources/category/model/category.model';
import { Supplier, ISupplierDocument } from '../app/resources/supplier/model/supplier.model';

describe("products API",()=>{
    let someAdminValidUser:IUser;
    let someInventoryValidUser: IUser; 
    let someCheckoutValidUser: IUser; 
    let someCheckoutValidUserDocument: IUserDocument;
    let someAdminValidUserDocument: IUserDocument;
    let someInventoryValidUserDocument: IUserDocument;
    let someCategories:ICategory[];
    let someSuppliers:ISupplier[];
    let someSuppliersDocument:ISupplierDocument[];
    let someCategoriesDocument:ICategoryDocument[];
    let someProducts: IProduct[];
    let someProductsDocument: IProductDocument[];
    let adminToken;
    let inventoryToken;
    let checkoutToken;
    const uri = '/products';
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
        someSuppliers = [
            {
                contact:{
                    firstName:"someFirstName",
                    lastName:"someLastName",
                    email:"someemail@email.com",
                    phoneNumber:"555-555-5554"
                },
                address:{
                    address:"someaddress",
                    city:"somesity",
                    zip:"13000"
                },
                name:"somename",

            },
            {
                contact:{
                    firstName:"someFirstName",
                    lastName:"someLastName",
                    email:"someemail@email.com",
                    phoneNumber:"555-555-5554"
                },
                address:{
                    address:"someaddress",
                    city:"somesity",
                    zip:"13000"
                },
                name:"somename",
            },
        ];
        someSuppliersDocument = await Supplier.create(someSuppliers);
        someProducts = [
            {
                name:"someProductName",
                category:{
                    id:someCategoriesDocument[0]._id.toHexString(),
                },
                supplier:{
                    id:someSuppliersDocument[0]._id.toHexString(),
                },
            },
            {
                name:"someProductName",
                category:{
                    id:someCategoriesDocument[1]._id.toHexString(),
                },
                supplier:{
                    id:someSuppliersDocument[1]._id.toHexString(),
                },
                codebar:"8".repeat(12),
                description:"somedescription",
                quantityAlert:{
                    maxQuantity:50,
                    minQuantity:1
                },
            },
        ];
        someProductsDocument = await Product.create(someProducts);
        
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
        it("should return products when authenticated",async(done)=>{
            const response = await request(app).get(uri).set('Authorization',"Bearer "+adminToken);
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body.data)).toEqual(JSON.stringify(someProductsDocument.map((d)=>d.toJSON())));
            done();
        });
    });
    describe("GET /:id",()=>{
        it("should require authentication",async ()=>{
            const response = await request(app).get(path.join(uri,someProductsDocument[0]._id.toHexString()));
            expect(response.status).toBe(401);
        });
        it("should return the product when authenticated",async()=>{
            const response = await request(app).get(path.join(uri,someProductsDocument[0]._id.toHexString())).set('Authorization',"Bearer "+adminToken);
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body.data)).toEqual(JSON.stringify(someProductsDocument[0]));
        });
    });
    describe("POST /",()=>{
        it("should require authentication",async ()=>{
            const response = await request(app).post(uri).send({data:someProducts[0]});
            expect(response.status).toBe(401);
        });
        it("should require Inventory or Admin role Auth",async ()=>{
            let response = await request(app).post(uri).send({data:someProducts[0]}).set('Authorization',"Bearer "+checkoutToken);
            expect(response.status).toBe(403);
            expect(response.body).toHaveProperty('error')
            response = await request(app).post(uri).send({data:someProducts[0]}).set('Authorization',"Bearer "+adminToken);
            expect(response.status).not.toBe(403);
            expect(response.body).toHaveProperty('data')
            
            response = await request(app).post(uri).send({data:someProducts[1]}).set('Authorization',"Bearer "+inventoryToken);
            expect(response.status).not.toBe(403);
            expect(response.body).toHaveProperty('data')

        });
        it("should return 201 with the new product as data when successful",async ()=>{
            const someNewProduct: IProduct = {
                name:"someNewProductName",
                category:{
                    id:someCategoriesDocument[1]._id
                },
                supplier:{
                    id:someSuppliersDocument[1]._id
                }
            };
            const response = await request(app).post(uri).send({data:someNewProduct}).set("Authorization","Bearer "+adminToken);
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("data");
                    
        });
    });

    describe("PUT /:id",()=>{
        it("should require authentication",async ()=>{
            const response = await request(app).put(uri).send({data:someProducts[0]});
            expect(response.status).toBe(401);
        });
        it("should require Inventory or Admin role Auth",async ()=>{
            let response = await request(app).put(path.join(uri,someProductsDocument[0]._id.toHexString())).send({data:someProducts[0]}).set('Authorization',"Bearer "+checkoutToken);
            expect(response.status).toBe(403);
            expect(response.body).toHaveProperty('error')
            response = await request(app).put(path.join(uri,someProductsDocument[0]._id.toHexString())).send({data:someProducts[0]}).set('Authorization',"Bearer "+adminToken);
            expect(response.status).not.toBe(403);
            expect(response.body).toHaveProperty('data')
            response = await request(app).put(path.join(uri,someProductsDocument[1]._id.toHexString())).send({data:someProducts[1]}).set('Authorization',"Bearer "+inventoryToken);
            expect(response.status).not.toBe(403);
            expect(response.body).toHaveProperty('data')
        });
        it("should return 200 with the new product as data when successful",async ()=>{
            const someNewProduct: IProduct = {
                name:"someOtherProductName",
                category:{
                    id:someCategoriesDocument[0]._id
                },
                supplier:{
                    id:someSuppliersDocument[0]._id
                }
            };
            const response = await request(app).put(path.join(uri,someProductsDocument[0]._id.toHexString())).send({data:someNewProduct}).set("Authorization","Bearer "+adminToken);
            expect(response.status).toBe(200);
            expect(response.body.data.name).toBe(someNewProduct.name)
            expect(response.body.data._id).toBe(someProductsDocument[0]._id.toHexString());
        });
    });
    
    describe("DELETE /:id",()=>{
        it("should require authentication",async ()=>{
            const response = await request(app).del(uri).send({data:someProducts[0]});
            expect(response.status).toBe(401);
        });
        it("should require Inventory or Admin role Auth",async ()=>{
            let response = await request(app).del(path.join(uri,someProductsDocument[0]._id.toHexString())).set('Authorization',"Bearer "+checkoutToken);
            expect(response.status).toBe(403);
            expect(response.body).toHaveProperty('error')
            response = await request(app).del(path.join(uri,someProductsDocument[0]._id.toHexString())).set('Authorization',"Bearer "+adminToken);
            expect(response.status).not.toBe(403);
            expect(response.body).toHaveProperty('data')
            response = await request(app).del(path.join(uri,someProductsDocument[1]._id.toHexString())).set('Authorization',"Bearer "+inventoryToken);
            expect(response.status).not.toBe(403);
            expect(response.body).toHaveProperty('data')
        });
        it("should return 200 with the deleted product as data when successful",async ()=>{
            const response = await request(app).del(path.join(uri,someProductsDocument[1]._id.toHexString())).set("Authorization","Bearer "+adminToken);
            expect(response.status).toBe(200);
            expect(response.body.data._id).toBe(someProductsDocument[1]._id.toHexString());
        });
    });
});