import { IProductDocument } from './../../product/model/product.model';
import { IProduct, IOrder } from '@workspace/interfaces';
import { Product } from '../../product/model/product.model';
import { OrderController } from './order.controller';
import * as mongoose from "mongoose";
import {Request,Response} from "express";
import {connect, closeDatabase, clearDatabase} from "../../../../test-db-setup";
import { Category } from '../../category/model/category.model';
import { Supplier } from '../../supplier/model/supplier.model';
describe("OrderController",()=>{
    let controller: OrderController;
    beforeAll(()=>{
        return connect();
    });
    afterAll(()=>{
        return closeDatabase();
    });
    beforeEach(()=>{
        controller = new OrderController();
    });
    afterEach(()=>{
        return clearDatabase();
    })
    describe("createOne",()=>{
        xit("should increase the number of sold products",async ()=>{
            jest.mock("mongoose",()=>({
                ...mongoose,
                startSession(){
                    console.log("Hello World");
                }
            }))
            const someCategories = [
                {
                    name:"someName",
                },
                {
                    name:"someOtherName",
                }
            ];
            const someCategoriesDocument = await Category.create(someCategories);
            const someSuppliers = [
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
            const someSuppliersDocument = await Supplier.create(someSuppliers);
            const someObjectId = mongoose.Types.ObjectId();
            const anotherObjectId = mongoose.Types.ObjectId();
            const product: IProduct = {
                codebar:"somecodebar",
                name:"somename",
                entries:[
                    {
                        _id:someObjectId.toHexString(),
                        boughtPrice:60,
                        price:80,
                        discount:0,
                        quantityInfo:{
                            soldQuantity:0,
                            checkedInQuantity:50,
                        },
                    },
                    {
                        _id:anotherObjectId.toHexString(),
                        boughtPrice:20,
                        price:32,
                        discount:0,
                        quantityInfo:{
                            soldQuantity:20,
                            checkedInQuantity:80,
                        },
                    },
                ],
                supplier:{
                    id:someSuppliersDocument[0]._id.toHexString(),
                },
                category:{
                    id:someCategoriesDocument[0]._id.toHexString(),
                },
                mainEntryId:anotherObjectId.toHexString(),
            };
            const productDocument:IProductDocument = await Product.create(product);
            expect(productDocument).toBeTruthy();
            const order:IOrder = {
                entries:[
                    {
                        productId:productDocument._id,
                        quantity:5,
                    },
                    
                    {
                        productId:productDocument._id,
                        quantity:30,
                    }
                ]
            };
            const req: Partial<Request> = {
                body:{
                    data:order
                }
            };
            const res:Partial<Response> = {
                json(document):Response{
                    return this;
                },
                status(code):Response{
                    return this;
                }
            }
            await controller.createOne(req,res);
        })
    });
});