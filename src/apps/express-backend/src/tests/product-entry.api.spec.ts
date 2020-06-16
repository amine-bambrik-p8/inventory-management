import { Category } from '../app/resources/category/model/category.model';
import { IProductDocument, Product } from '../app/resources/product/model/product.model';
import { app } from '../main';
import { IUser, Role, IProduct, ICategory, ISupplier, IProductEntry } from '@workspace/interfaces';
import { IUserDocument, User } from '../app/resources/user/model/user.model';
import * as request from "supertest";
import { connect, clearDatabase, closeDatabase } from "../test-db-setup";
import * as path from "path";
import * as mongoose from "mongoose";
import { ICategoryDocument } from '../app/resources/category/model/category.model';
import { Supplier, ISupplierDocument } from '../app/resources/supplier/model/supplier.model';

describe("product-entry API",()=>{
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
    let someProductEntry: IProductEntry;
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
        someProductEntry = {
            boughtPrice:23,
            price:15,
            quantityInfo:{
                checkedInQuantity:40,
                soldQuantity:5,
            },
        }
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
                entries:[
                    {
                        boughtPrice:23,
                        price:15,
                        quantityInfo:{
                            checkedInQuantity:40,
                            soldQuantity:5,
                        },
                    }
                ],
                codebar:"8".repeat(8),
                description:"somedescription",
                quantityAlert:{
                    maxQuantity:50,
                    minQuantity:1
                },
            },
        ];
        someProductsDocument = await Product.create(someProducts);
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
            const response = await request(app).get(path.join(uri,someProductsDocument[1]._id.toHexString(),"entries"));
            expect(response.status).toBe(401);
        });
        it("should return products when authenticated",async()=>{
            const response = await request(app).get(path.join(uri,someProductsDocument[1]._id.toHexString(),"entries")).set('Authorization',"Bearer "+adminToken);
            console.log(response.body.error);

            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body.data)).toEqual(JSON.stringify(someProductsDocument[1].toJSON().entries));
    });
    })
    describe("POST /:id",()=>{
        it("should require authentication",async ()=>{
            const someEntryId = (someProductsDocument[1].entries[0] as any)._id.toHexString();
            const response = await request(app).post(path.join(uri,someProductsDocument[1]._id.toHexString(),"entries",someEntryId));
            expect(response.status).toBe(401);
        });
        it("should return the product when authenticated",async()=>{
            const someEntryId = (someProductsDocument[1].entries[0] as any)._id.toHexString();
            const response = await request(app).post(path.join(uri,someProductsDocument[1]._id.toHexString(),"entries",someEntryId)).set('Authorization',"Bearer "+adminToken);
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body.data)).toEqual(JSON.stringify(someProductsDocument[1].toJSON().entries[0]));
        });
    });
    describe("POST /",()=>{
        it("should require authentication",async ()=>{
            const response = await request(app).post(path.join(uri,someProductsDocument[1]._id.toHexString(),"entries")).send({data:someProductEntry});
            expect(response.status).toBe(401);
        });
        it("should require Inventory or Admin role Auth",async ()=>{
            let response = await request(app).post(path.join(uri,someProductsDocument[1]._id.toHexString(),"entries")).send({data:someProductEntry}).set('Authorization',"Bearer "+checkoutToken);
            console.log(response.error);
            expect(response.status).toBe(403);
            expect(response.body).toHaveProperty('error')
            response = await request(app).post(path.join(uri,someProductsDocument[1]._id.toHexString(),"entries")).send({data:someProductEntry}).set('Authorization',"Bearer "+adminToken);
            expect(response.status).not.toBe(403);
            expect(response.body).toHaveProperty('data')
            
            response = await request(app).post(path.join(uri,someProductsDocument[1]._id.toHexString(),"entries")).send({data:someProductEntry}).set('Authorization',"Bearer "+inventoryToken);
            expect(response.status).not.toBe(403);
            expect(response.body).toHaveProperty('data')

        });
        it("should return 201 with the new product as data when successful",async ()=>{
            const someNewProductEntry: IProductEntry = {
                ...someProductEntry,
                price:50
            };
            const response = await request(app).post(path.join(uri,someProductsDocument[1]._id.toHexString(),"entries")).send({data:someNewProductEntry}).set("Authorization","Bearer "+adminToken);
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("data");
                    
        });
    });

    describe("PUT /:id",()=>{
        it("should require authentication",async ()=>{
            const someEntryId = (someProductsDocument[1].entries[0] as any)._id.toHexString();

            const response = await request(app).put(path.join(uri,someProductsDocument[1]._id.toHexString(),"entries",someEntryId)).send({data:someProductEntry});
            expect(response.status).toBe(401);
        });
        it("should require Inventory or Admin role Auth",async ()=>{
            const someEntryId = (someProductsDocument[1].entries[0] as any)._id.toHexString();

            let response = await request(app).put(path.join(uri,someProductsDocument[1]._id.toHexString(),"entries",someEntryId)).send({data:someProductEntry}).set('Authorization',"Bearer "+checkoutToken);
            expect(response.status).toBe(403);
            expect(response.body).toHaveProperty('error')
            response = await request(app).put(path.join(uri,someProductsDocument[1]._id.toHexString(),"entries",someEntryId)).send({data:someProductEntry}).set('Authorization',"Bearer "+adminToken);
            expect(response.status).not.toBe(403);
            expect(response.body).toHaveProperty('data')
            response = await request(app).put(path.join(uri,someProductsDocument[1]._id.toHexString(),"entries",someEntryId)).send({data:someProductEntry}).set('Authorization',"Bearer "+inventoryToken);
            expect(response.status).not.toBe(403);
            expect(response.body).toHaveProperty('data')
        });
        it("should return 200 with the new product as data when successful",async ()=>{
            const someEntryId = (someProductsDocument[1].entries[0] as any)._id.toHexString();
            const someNewProductEntry: IProductEntry = {
                ...someProductEntry,
                price:50
            };
            const response = await request(app).put(path.join(uri,someProductsDocument[1]._id.toHexString(),"entries",someEntryId)).send({data:someNewProductEntry}).set("Authorization","Bearer "+adminToken);
            expect(response.status).toBe(200);
            expect(response.body.data.entries.find(p=>p._id===someEntryId).price).toBe(someNewProductEntry.price)
            expect(response.body.data._id).toBe(someProductsDocument[1]._id.toHexString());
        });
    });
    
    describe("DELETE /:id",()=>{
        it("should require authentication",async ()=>{
            const someEntryId = (someProductsDocument[1].entries[0] as any)._id.toHexString();
            const response = await request(app).del(path.join(uri,someProductsDocument[1]._id.toHexString(),"entries",someEntryId));
            expect(response.status).toBe(401);
        });
        it("should require Inventory or Admin role Auth",async ()=>{
            let someEntryId = (someProductsDocument[1].entries[0] as any)._id.toHexString();
            let response = await request(app).del(path.join(uri,someProductsDocument[1]._id.toHexString(),"entries",someEntryId)).set('Authorization',"Bearer "+checkoutToken);
            expect(response.status).toBe(403);
            expect(response.body).toHaveProperty('error')
            response = await request(app).del(path.join(uri,someProductsDocument[1]._id.toHexString(),"entries",someEntryId)).set('Authorization',"Bearer "+adminToken);
            expect(response.status).not.toBe(403);
            expect(response.body).toHaveProperty('data')
            someProductsDocument = await Product.create(someProducts);
            someEntryId = (someProductsDocument[1].entries[0] as any)._id.toHexString();
            response = await request(app).del(path.join(uri,someProductsDocument[1]._id.toHexString(),"entries",someEntryId)).set('Authorization',"Bearer "+inventoryToken);
            expect(response.status).not.toBe(403);
            expect(response.body).toHaveProperty('data')
        });
        it("should return 200 with the deleted product as data when successful",async ()=>{
            const someEntryId = (someProductsDocument[1].entries[0] as any)._id.toHexString();
            const response = await request(app).del(path.join(uri,someProductsDocument[1]._id.toHexString(),"entries",someEntryId)).set("Authorization","Bearer "+adminToken);
            expect(response.status).toBe(200);
            expect(response.body.data._id).toBe(someProductsDocument[1]._id.toHexString());
        });
    });
})