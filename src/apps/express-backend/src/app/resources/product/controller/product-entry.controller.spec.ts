import { Request,Response } from 'express';
import { Product, IProductDocument } from './../model/product.model';
import { IProductEntry,IProduct } from '@workspace/interfaces';
import { ProductEntryController } from './product-entry.controller';
import { connect, closeDatabase, clearDatabase } from '../../../../test-db-setup';
import * as mongoose from 'mongoose';
import { Category } from '../../category/model/category.model';
import { Supplier } from '../../supplier/model/supplier.model';
describe("ProductEntry controller",()=>{
    let controller: ProductEntryController;
    let someValidEntry: IProductEntry;
    let someValidProduct: IProduct;
    beforeEach(()=>{
        controller = new ProductEntryController();
    });
    beforeAll(()=>{
        return connect();
    });
    afterAll(()=>{
        return closeDatabase();
    });
    beforeEach(async ()=>{
        someValidEntry = {
            boughtPrice:20,
            price:10,
            quantityInfo:{
                checkedInQuantity:50,
                soldQuantity:20,
            }
        };
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
        someValidProduct= {
            codebar:"12354865",
            name:"somename",
            entries:[
            ],
            supplier:someSuppliersDocument[0]._id.toHexString(),
            category:someCategoriesDocument[0]._id.toHexString()

        }
    });
    afterEach(()=>{
        return clearDatabase();
    })
    describe("readMany",()=>{
        it("should return 400 and error with message if product doesn't exist",async ()=>{
            const someProductId: string = mongoose.Types.ObjectId().toHexString();
            const req: Partial<Request> = {
                params:{
                    productId:someProductId,
                },
            }
            const res:Partial<Response> = {
                status(code){
                    expect(code).toBe(400);
                    return this;
                },
                json(document){
                    expect(document).toHaveProperty("error");
                    expect(document.error).toHaveProperty("message");
                    return this;
                },
            };
            await controller.readMany(req,res,console.error);

        });
        it("should return 200 with productEntries as data",async ()=>{
            expect.assertions(3);
            const someValidProductWithEntry: IProduct = {...someValidProduct,entries:[someValidEntry]};
            const someProductDocument: IProductDocument = (await Product.create(someValidProductWithEntry)).toJSON();
            const req: Partial<Request> = {
                params:{
                    productId: someProductDocument._id,
                },
            };
            const res: Partial<Response> = {
                status(code){
                    expect(code).toBe(200);
                    return this;
                },
                json(document){
                    expect(document).toHaveProperty("data");
                    expect(document.data[0].toJSON()).toEqual(someProductDocument.entries[0]);
                    return this;
                }
            };
            await controller.readMany(req,res,console.error);
        });
    })
    describe("setMainEntry",()=>{
        it("should return 400 and error with message if the product doesn't exist",async ()=>{
            expect.assertions(3);
            const someProductId: string = mongoose.Types.ObjectId().toHexString();
            const someValidProductWithEntry:IProduct = {...someValidProduct};
            someValidProductWithEntry.entries.push(someValidEntry);
            const someValidProductDocument:IProductDocument =  (await Product.create(someValidProductWithEntry)).toJSON();
            const req:Partial<Request> = {
                params:{
                    productId:someProductId,
                    id:someValidProductDocument.entries.pop()._id,
                }
            };
            const res:Partial<Response> = {
                status(code){
                    expect(code).toBe(400);
                    return this;
                },
                json(document){
                    expect(document).toHaveProperty("error");
                    expect(document.error).toHaveProperty("message");
                    return this;
                }
            };
            await controller.setMainEntry(req,res,console.error);
        });
        it("should return 400 and error with message if entry doesn't exist",async ()=>{
            expect.assertions(3);
            const someProductEntryId: string = mongoose.Types.ObjectId().toHexString();
            const someValidProductDocument: IProductDocument = await Product.create(someValidProduct);
            const req: Partial<Request> = {
                params:{
                    productId:someValidProductDocument._id,
                    id:someProductEntryId
                }
            };
            const res:Partial<Response> = {
                status(code){
                    expect(code).toBe(400);
                    return this;
                },
                json(document){
                    expect(document).toHaveProperty("error");
                    expect(document.error).toHaveProperty("message");
                    return this;
                }
            };
            await controller.setMainEntry(req,res,console.error)
        });
        it("should set the mainEntryId to the passed id return 200 and the mainentry document as data",async ()=>{
            expect.assertions(3);
            const someValidProductWithEntry = {...someValidProduct};
            someValidProductWithEntry.entries.push(someValidEntry);
            const someValidProductDocument = (await Product.create(someValidProductWithEntry)).toJSON();
            const req: Partial<Request> = {
                params:{
                    productId:someValidProductDocument._id,
                    id:someValidProductDocument.entries[0]._id
                }
            };
            const res:Partial<Response> = {
                status(code){
                    expect(code).toBe(200);
                    return this;
                },
                json(document){
                    expect(document).toHaveProperty("data");
                    expect(document.data.toJSON()).toEqual(someValidProductDocument.entries[0]);
                    return this;
                }
            }
            await controller.setMainEntry(req,res,console.error);
        });
    });
    describe("createOne", ()=>{
        it("should return 400 and error with message when product doesn't exist",async()=>{
            expect.assertions(3);
            const req:Partial<Request> = {
                body:{
                },
                params:{
                    productId: mongoose.Types.ObjectId().toHexString(),
                }
            };
            const res:Partial<Response> = {
                json(document){
                    expect(document).toHaveProperty("error");
                    expect(document.error).toHaveProperty("message");
                    return this;
                },
                status(code){
                    expect(code).toBe(400)
                    return this;
                }
            };
            await controller.createOne(req,res);
        });
        it("should call findByIdAndUpdate with productId productEntry",async ()=>{
            const someId = mongoose.Types.ObjectId().toHexString();
            const req:Partial<Request> = {
                body:{
                    data:someValidEntry,
                },
                params:{
                    productId:someId
                },
            };
            const res:Partial<Response>={
                json(document){
                    return this;
                },
                status(code){
                    return this;
                }   
            }
            const spy = spyOn(Product,"findByIdAndUpdate");
            await controller.createOne(req,res);
            expect(spy).toHaveBeenCalledWith(someId,{
                $push:{
                    entries:someValidEntry,
                }
            },{
                new:true
            });
        });
        it("should return 201 and the created document",async()=>{
            expect.assertions(3)
            const productDocument:IProductDocument = await Product.create(someValidProduct);
            const req:Partial<Request> = {
                body:{
                    data:someValidEntry
                },
                params:{
                    productId: productDocument._id.toHexString(),
                }
            }
            const res:Partial<Response>={
                json(document){
                    expect(document).toHaveProperty("data");
                    const {__v,_id,id,discount,quantity,...orderEntry} = document.data.toJSON().entries[0];
                    expect(orderEntry).toEqual(someValidEntry);
                    return this;
                },
                status(code){
                    expect(code).toBe(201)
                    return this;
                }
            };
            await controller.createOne(req,res);
        })
    });
    describe("deleteOne",()=>{
        it("should return 404 and error with message",async ()=>{
            expect.assertions(3);
            const someId = mongoose.Types.ObjectId().toHexString();
            const someOtherId = mongoose.Types.ObjectId().toHexString();
            const req: Partial<Request> = {
                params:{
                    id:someId,
                    productId:someOtherId
                }
            };
            const res: Partial<Response> = {
                json(document){
                    expect(document).toHaveProperty("error");
                    expect(document.error).toHaveProperty("message");
                    return this;
                },
                status(code){
                    expect(code).toBe(404);
                    return this;
                }
            };
            await controller.deleteOne(req,res);
        });
        it("should return a 200 with the deleted document as data",async()=>{
            expect.assertions(3);
            someValidProduct.entries.push(someValidEntry);
            const someProductDocument: IProductDocument = await Product.create(someValidProduct);
            const req: Partial<Request> = {
                params:{
                    id:someProductDocument.entries[0]._id,
                    productId:someProductDocument._id
                },
            };
            const res: Partial<Response>={
                json(document){
                    expect(document).toHaveProperty("data");
                    const {__v,...expectedRes} = someProductDocument.toJSON();
                    expectedRes.entries.pop();
                    const {__v:something,...result} = document.data.toJSON();
                    expect(result).toEqual(expectedRes);
                    return this;
                },
                status(code){
                    expect(code).toBe(200);
                    return this;
                }
            };
            await controller.deleteOne(req,res);
        });
    });
    describe("updateOne",()=>{
        it("should return 404 and error with message when Product doesn't exist",async ()=>{
            expect.assertions(3);
            const someId = mongoose.Types.ObjectId().toHexString();
            const someOtherId = mongoose.Types.ObjectId().toHexString();
            const req: Partial<Request> = {
                body:{
                    data:{
                    },
                },
                params:{
                    id:someId,
                    productId:someOtherId
                }
            };
            const res: Partial<Response> = {
                json(document){
                    expect(document).toHaveProperty("error");
                    expect(document.error).toHaveProperty("message");
                    return this;
                },
                status(code){
                    expect(code).toBe(404);
                    return this;
                }
            };
            await controller.updateOne(req,res);
        });
        it("should return 200 and data representing the updated document",async ()=>{
            expect.assertions(3);
            someValidProduct.entries.push(someValidEntry);
            const someProductDocument: IProductDocument = await Product.create(someValidProduct);
            const someUpdate: Partial<IProductEntry> = {
                price:999
            };
            const req: Partial<Request> = {
                params:{
                    id:someProductDocument.entries[0]._id,
                    productId:someProductDocument._id
                },
                body:{
                    data:someUpdate
                }
            };
            const res: Partial<Response>={
                json(document){
                    expect(document).toHaveProperty("data");
                    const {__v,...expectedRes} = someProductDocument.toJSON();
                    expectedRes.entries[0]={...expectedRes.entries[0],...someUpdate};
                    const {__v:something,...result} = document.data.toJSON();
                    expect(result).toEqual(expectedRes);
                    return this;
                },
                status(code){
                    expect(code).toBe(200);
                    return this;
                }
            };
            await controller.updateOne(req,res);
        })
    })
});