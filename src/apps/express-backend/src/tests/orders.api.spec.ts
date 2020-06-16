import { ICategoryDocument, Category } from './../app/resources/category/model/category.model';
import { ISupplierDocument, Supplier } from './../app/resources/supplier/model/supplier.model';
import { environment } from './../environments/environment';
import { IProductDocument, Product } from './../app/resources/product/model/product.model';
import { IOrderDocument, Order } from '../app/resources/order/model/order.model';
import { app } from '../main';
import { IUser, Role, IOrder, IProduct, ICategory, ISupplier } from '@workspace/interfaces';
import { IUserDocument, User } from '../app/resources/user/model/user.model';
import * as request from "supertest";
import {  clearDatabase, closeDatabase } from "../test-db-setup";
import * as path from "path";
import * as mongoose from "mongoose";
import { connect } from "../app/utils/db/db";
describe("orders API",()=>{
    let someAdminValidUser: IUser;
    let someInventoryValidUser: IUser; 
    let someCheckoutValidUser: IUser; 
    let someCheckoutValidUserDocument: IUserDocument;
    let someAdminValidUserDocument: IUserDocument;
    let someInventoryValidUserDocument: IUserDocument;
    let someCategories:ICategory[];
    let someSuppliers:ISupplier[];
    let someSuppliersDocument:ISupplierDocument[];
    let someCategoriesDocument:ICategoryDocument[];
    let someOrders: IOrder[];
    let someOrdersDocument: IOrderDocument[];
    let someProduct: IProduct;
    let someProductDocument:IProductDocument;
    let adminToken;
    let inventoryToken;
    let checkoutToken;
    const uri = '/orders';
    beforeAll(()=>{
        return connect(environment.mongoose.uri,environment.mongoose.options);
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
            username:"username4",
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
        someOrders = [
            {
                entries:[
                    {
                        quantity:10,
                        
                        productEntry:{
                            boughtPrice:23,
                            price:15,
                            quantityInfo:{
                                checkedInQuantity:40,
                                soldQuantity:5,
                            },
                        }
                    }
                ]
            },
            {
                entries:[
                    {
                        quantity:15,
                        productEntry:{
                            boughtPrice:50,
                            price:90,
                            quantityInfo:{
                                checkedInQuantity:400,
                                soldQuantity:50,
                            },
                        }
                    }
                ]
            },
        ] as any;
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
        someProduct = {
            name:"someProductName",
            category:{
                id:someCategoriesDocument[0]._id.toHexString()
            },
            supplier:{
                id:someSuppliersDocument[0]._id.toHexString(),
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
        }
        someProductDocument = await Product.create(someProduct);
        someProductDocument = await Product.findByIdAndUpdate(someProductDocument._id,{
            $set:{
                mainEntryId:someProductDocument.entries[0]._id,
            }
        });
        someOrdersDocument = await Order.create(someOrders);
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
        it("should return orders when authenticated",async(done)=>{
            const response = await request(app).get(uri).set('Authorization',"Bearer "+adminToken);
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body.data)).toEqual(JSON.stringify(someOrdersDocument.map((d)=>d.toJSON())));
            done();
        });
    });
    describe("GET /:id",()=>{
        it("should require authentication",async ()=>{
            const response = await request(app).get(path.join(uri,someOrdersDocument[0]._id.toHexString()));
            expect(response.status).toBe(401);
        });
        it("should return the order when authenticated",async()=>{
            const response = await request(app).get(path.join(uri,someOrdersDocument[0]._id.toHexString())).set('Authorization',"Bearer "+adminToken);
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body.data)).toEqual(JSON.stringify(someOrdersDocument[0]));
        });
    });
    describe("POST /",()=>{
        it("should require authentication",async ()=>{
            const response = await request(app).post(uri).send({data:someOrders[0]});
            expect(response.status).toBe(401);
        });
        it("should not require role Auth",async ()=>{
            someOrders=[
                {
                    entries:[
                        {
                            quantity:10,
                            productId:someProductDocument._id,

                        }
                    ]
                },{
                    entries:[
                        {
                            quantity:12,
                            productId:someProductDocument._id
                        }
                    ]
                }
            ]
            let response = await request(app).post(uri).send({data:someOrders[0]}).set('Authorization',"Bearer "+checkoutToken);
            expect(response.status).not.toBe(403);
            expect(response.body).toHaveProperty('data')
            response = await request(app).post(uri).send({data:someOrders[0]}).set('Authorization',"Bearer "+adminToken);
            expect(response.status).not.toBe(403);
            expect(response.body).toHaveProperty('data')
            
            response = await request(app).post(uri).send({data:someOrders[1]}).set('Authorization',"Bearer "+inventoryToken);
            expect(response.status).not.toBe(403);
            expect(response.body).toHaveProperty('data')

        });
        it("should return 201 with the new order as data when successful",async ()=>{
            const someNewOrder: IOrder = {
                entries:[
                    {
                        quantity:10,
                        productId:someProductDocument._id.toHexString(),
                    },
                ]
            };
            const response = await request(app).post(uri).send({data:someNewOrder}).set("Authorization","Bearer "+adminToken);
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("data");
                    
        });
    });

    describe("PUT /:id",()=>{
        it("should require authentication",async ()=>{
            const response = await request(app).put(uri).send({data:someOrders[0]});
            expect(response.status).toBe(401);
        });
        it("should require Inventory or Admin role Auth",async ()=>{
            someOrders=[
                {
                    entries:[
                        {
                            quantity:10,
                            productId:someProductDocument._id
                        }
                    ]
                },
                {
                    entries:[
                        {
                            quantity:10,
                            productId:someProductDocument._id
                        }
                    ]
                }
            ]
            let response = await request(app).put(path.join(uri,someOrdersDocument[0]._id.toHexString())).send({data:someOrders[0]}).set('Authorization',"Bearer "+checkoutToken);
            expect(response.status).toBe(403);
            expect(response.body).toHaveProperty('error')
            response = await request(app).put(path.join(uri,someOrdersDocument[0]._id.toHexString())).send({data:someOrders[0]}).set('Authorization',"Bearer "+adminToken);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('data')
            response = await request(app).put(path.join(uri,someOrdersDocument[1]._id.toHexString())).send({data:someOrders[1]}).set('Authorization',"Bearer "+inventoryToken);
            expect(response.status).toBe(403);
            expect(response.body).toHaveProperty('error')
        });
        it("should return 200 with the new order as data when successful",async ()=>{
            const someNewOrder: IOrder = {
                entries:[
                    {
                        quantity:60,
                        productId:someProductDocument._id.toHexString(),
                    },
                ]
            };
            const response = await request(app).put(path.join(uri,someOrdersDocument[0]._id.toHexString())).send({data:someNewOrder}).set("Authorization","Bearer "+adminToken);
            expect(response.status).toBe(200);
            expect(response.body.data.entries.length).toBe(someNewOrder.entries.length)
            expect(response.body.data._id).toBe(someOrdersDocument[0]._id.toHexString());
        });
    });
    
    describe("DELETE /:id",()=>{
        it("should require authentication",async ()=>{
            const response = await request(app).del(uri).send({data:someOrders[0]});
            expect(response.status).toBe(401);
        });
        it("should require Inventory or Admin role Auth",async ()=>{
            let response = await request(app).del(path.join(uri,someOrdersDocument[0]._id.toHexString())).set('Authorization',"Bearer "+checkoutToken);
            expect(response.status).toBe(403);
            expect(response.body).toHaveProperty('error')
            response = await request(app).del(path.join(uri,someOrdersDocument[0]._id.toHexString())).set('Authorization',"Bearer "+adminToken);
            expect(response.status).not.toBe(403);
            expect(response.body).toHaveProperty('data')
            response = await request(app).del(path.join(uri,someOrdersDocument[1]._id.toHexString())).set('Authorization',"Bearer "+inventoryToken);
            expect(response.status).toBe(403);
            expect(response.body).toHaveProperty('error')
        });
        it("should return 200 with the deleted order as data when successful",async ()=>{
            const response = await request(app).del(path.join(uri,someOrdersDocument[1]._id.toHexString())).set("Authorization","Bearer "+adminToken);
            expect(response.status).toBe(200);
            expect(response.body.data._id).toBe(someOrdersDocument[1]._id.toHexString());
        });
    });
});