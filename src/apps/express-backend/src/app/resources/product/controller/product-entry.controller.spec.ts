import { Request,Response } from 'express';
import { Product, IProductDocument } from './../model/product.model';
import { IProductEntry,IProduct } from '@workspace/interfaces';
import { ProductEntryController } from './product-entry.controller';
import { connect, closeDatabase, clearDatabase } from '../../../../test-db-setup';
import * as mongoose from 'mongoose';
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
    beforeEach(()=>{
        someValidEntry = {
            boughtPrice:20,
            price:10,
            quantityInfo:{
                checkedInQuantity:50,
                soldQuantity:20,
            }
        };
        const someObjectId = mongoose.Types.ObjectId();
        const anotherObjectId = mongoose.Types.ObjectId();
        someValidProduct= {
            codebar:"somecodebar",
            name:"somename",
            entries:[
            ],
            supplierId:anotherObjectId.toHexString(),
            categoryId:someObjectId.toHexString(),

        }
    });
    afterEach(()=>{
        return clearDatabase();
    })
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
                    console.log(JSON.stringify(document,null,2));
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