import { ICategoryDocument } from '../../../resources/category/model/category.model';
import { Request,Response } from 'express';
import { Category } from '../../../resources/category/model/category.model';
import {CRUDController} from "./crud.controller";
import {ICategory,Role} from "@workspace/interfaces";
import {connect,clearDatabase, closeDatabase} from '../../../../test-db-setup';
import * as mongoose from 'mongoose';

describe("CRUDController ", () => {
  let controller: CRUDController  ;
  beforeAll(() => {
    return connect();
  });
  afterAll( ()=>{
    return closeDatabase();
  })
  beforeEach(() => {
    controller = new CRUDController(Category);
  });
  let someValidCategory: ICategory;
  beforeEach(() => {
    someValidCategory = {
      name:"somecategory"
    };
  });
  afterEach(()=>{
    return clearDatabase();
  })
  describe("createOne", () => {
    it("should call create on model", async () => {
      expect.assertions(1);
      const req:Partial<Request> = {
        body: {
          data: someValidCategory,
        },
      };
      const res:Partial<Response> = {
        status(code): Response{
          return this;
        },
        json(document):Response {
          return this;
        },
      };
      const mockCreate = spyOn(Category, "create");
      await controller.createOne(req, res);
      expect(mockCreate).toHaveBeenCalledWith(someValidCategory);
    });

    it("should return status 201 and return the created document", async () => {
      expect.assertions(3);
      const req: Partial<Request> = {
        body: {
          data: {
            ...someValidCategory,
          },
        },
      };
      const res: Partial<Response> = {
        status(code): Response {
          expect(code).toBe(201);
          return this;
        },
        json(document): Response {
          expect(document.data).toBeTruthy();
          const {
            __v,
            _id,
            ...createdCategory
          } = document.data.toJSON();
          expect(createdCategory).toEqual(someValidCategory);
          return this;
        },
      };
      await controller.createOne(req, res);
    });
    it("should call next when error is thrown",async ()=>{
      expect.assertions(1);
      const someError = "Error";
      const mockCreate = spyOn(Category,"create").and.throwError(someError);
      const req:Partial<Request> = {
        body:{
          data:{}
        }
      };
      const res:Partial<Response> = {
      };
      const mockNext = jest.fn().mockImplementation();
      await controller.createOne(req,res,mockNext);
      expect(mockNext).toHaveBeenCalled();
    });
  });
  describe("readOne", () => {
   

    it("should return 200 and the found document", async () => {
      expect.assertions(3);
      const someCategory:ICategoryDocument = await Category.create(someValidCategory);
      const req: Partial<Request> = {
          params: {
            id: someCategory._id,
          }
      };
      const res: Partial<Response>= {
        json(document): Response{
          expect(document.data).toBeTruthy();
          expect(document.data.toJSON()).toEqual(someCategory.toJSON());
          return this;
        },
        status(code): Response{
          expect(code).toBe(200);
          return this;
        }
      };
      await controller.readOne(req, res);
    });

    it("should call findById on model", async () => {
      expect.assertions(1);
      const someId = mongoose.Types.ObjectId().toHexString();
      const req: Partial<Request> = {
          params: {
            id: someId,
          }
      };
      const res: Partial<Response> = {
        json(document):Response {
          return this;
        },
        status(code):Response {
          return this;
        },
      };
      const mockFindById = spyOn(Category, "findById");
      await controller.readOne(req, res);
      expect(mockFindById).toHaveBeenCalledWith(someId);
    });
    it("should return 404 status when no document is found and error with message", async () => {
      expect.assertions(3);
      const someId: string = mongoose.Types.ObjectId().toHexString();
      const req: Partial<Request> = {
        params: {
          id: someId,
        },
      };
      const res: Partial<Response> = {
        json(document): Response {
          expect(document.error).toBeTruthy();
          expect(document.error.message).toBeTruthy();
          return this;
        },
        status(code): Response {
          expect(code).toBe(404);
          return this;
        },
      };
      spyOn(Category, "findById").and.returnValue(undefined);
      await controller.readOne(req, res);
    });
    it("should call next when error is thrown",async ()=>{
      expect.assertions(1);
      const someError = "Error"
      spyOn(Category,"findById").and.throwError(someError);
      const req: Partial<Request> = {
        params:{
          id:""
        }
      };
      const res: Partial<Response> = {
      };
      const mockNext = jest.fn().mockImplementation();
      await controller.readOne(req,res,mockNext);
      expect(mockNext).toHaveBeenCalled();
    });
  });
  describe("readMany", () => {

    it("should call find on model", async () => {
      const req = {};
      const res = {
        json(document) {
          return this;
        },
        status(code) {
          return this;
        },
      };
      const mockFind = spyOn(Category, "find");
      await controller.readMany(req, res);
      expect(mockFind).toHaveBeenCalledWith({});
    });

    it("should return status code 200 and return list of documents", async () => {
      expect.assertions(3)
      const someCategories:ICategory[] = [{
          name: "somecategory",
        },
        {
          name: "anothercategory",
        }
      ]
      const result: ICategoryDocument[] = await Category.create(someCategories);
      const req: Partial<Request> = {}
      const res: Partial<Response> = {
        json(document): Response {
          expect(document.data).toBeTruthy();
          expect(document.data.map((d)=>d.toJSON())).toEqual(result.map((d)=>d.toJSON()));
          return this;
        },
        status(code): Response {
          expect(code).toBe(200);
          return this;
        },
      }
      await controller.readMany(req, res);
    });
    it("should call next when error is thrown",async ()=>{
      expect.assertions(1);
      const someError = "Error"
      spyOn(Category,"find").and.throwError(someError);
      const req: Partial<Request> = {
      };
      const res: Partial<Response> = {
      };
      const mockNext = jest.fn().mockImplementation();
    await controller.readMany(req,res,mockNext);
    expect(mockNext).toHaveBeenCalled();
    });
  });
  describe("updateOne", () => {
    it("should exist", () => {
      expect(controller.updateOne).toBeTruthy();
    });
    it("should call findByIdAndUpdate on model", async () => {
      const someId = mongoose.Types.ObjectId().toHexString();
      const someUpdate:Partial<ICategory> = {
        name: "category",
      };
      const req: Partial<Request> = {
        params: {
          id: someId,
        },
        body:{
          data:{
            ...someUpdate 
          }
        }
      };
      const res: Partial<Response> = {
        json(document): Response {
          return this;
        },
        status(code): Response {
          return this;
        },
      };
      const spy = spyOn(Category, "findByIdAndUpdate");
      await controller.updateOne(req, res);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(someId,someUpdate,{new:true});
    });
    it("should return status code 200 and retrun the updated document", async () => {
      expect.assertions(3);
      const someCategory: ICategoryDocument = await Category.create({
        name: "Amine",
      });
      const someUpdate: Partial<ICategory>= {
        name: "Ilyes",
      };
      const expectedResult: Partial<ICategory> = {
        ...someCategory.toJSON(),
        ...someUpdate
      };

      const req: Partial<Request> = {
        params: {
          id: someCategory._id,
        },
        body: {
          data: {
            ...someUpdate,
          }
        }
      };
      const res: Partial<Response> = {
        status(code): Response {
          expect(code).toBe(200);
          return this;
        },
        json(document): Response {
          expect(document.data).toBeTruthy();
          expect(document.data.toJSON()).toEqual(expectedResult);
          return this;
        }
      };
      await controller.updateOne(req, res);
    });
    it("should return 404 status when no document is found and error with message", async ()=>{
        expect.assertions(3);
        const someId = mongoose.Types.ObjectId().toHexString();
        const someUpdate:Partial<ICategory> = {
          name: "Ilyes",
        };
        const req: Partial<Request> = {
            params: {
                id: someId,
            },
            body:{
              data:{...someUpdate}
            }
        };
        const res: Partial<Response> = {
            json(document){
                expect(document.error).toBeTruthy();
                expect(document.error.message).toBeTruthy();
                return this;
            },
            status(code){
                expect(code).toBe(404);
                return this;
            },
        };
        spyOn(Category,"findByIdAndUpdate").and.returnValue(undefined);
        await controller.updateOne(req,res);
    });
    it("should call next when error is thrown",async ()=>{
      expect.assertions(1);
      const someError = "Error"
      spyOn(Category,"findByIdAndUpdate").and.throwError(someError);
      const req: Partial<Request> = {
        params:{
          id:""
        },
        body:{
          data:{}
        }
      };
      const res: Partial<Response> = {
      };
      const mockNext = jest.fn().mockImplementation();
    await controller.updateOne(req,res,mockNext);
    expect(mockNext).toHaveBeenCalled();
    });
  });
  describe("deleteOne", () => {
    it("should exist", () => {
      expect(controller.deleteOne).toBeTruthy();
    });
    it("should call findByIdAndDelete", async () => {
      const someId = mongoose.Types.ObjectId().toHexString();
      const req:Partial<Request> = {
        params: {
          id: someId,
        },
      };
      const res:Partial<Response> = {
        json(document):Response {
          return this;
        },
        status(code):Response {
          return this;
        },
      };
      const mockFindByIdAndDelete = spyOn(Category, "findByIdAndDelete");
      await controller.deleteOne(req, res);
      expect(mockFindByIdAndDelete).toHaveBeenCalledWith(someId);
    });
    it("should return 200 status and the deleted document", async () => {
      expect.assertions(3);
      const result = await Category.create(someValidCategory);
      const req:Partial<Request> = {
        params: {
          id: result._id,
        },
      };
      const res:Partial<Response> = {
        status(code):Response {
          expect(code).toBe(200);
          return this;
        },
        json(document):Response {
          expect(document.data).toBeTruthy();
          expect(document.data.toJSON()).toEqual(result.toJSON());
          return this;
        },
      };
      await controller.deleteOne(req, res);
    });
    it("should return 404 status when resource is not found and an error with message",async ()=>{
        expect.assertions(3);
        const someId = mongoose.Types.ObjectId().toHexString();
        const req:Partial<Request> = {
            params:{
                id: someId,
            },
        };
        const res:Partial<Response> = {
            json(document):Response{
                expect(document.error).toBeTruthy();
                expect(document.error.message).toBeTruthy();
                return this;
            },
            status(code):Response{
                expect(code).toBe(404);
                return this;
            },
        };
        spyOn(Category,"findByIdAndDelete").and.returnValue(undefined);
        await controller.deleteOne(req,res);
    });
  });
  it("should call next when error is thrown",async ()=>{
    expect.assertions(1);
    const someError = "Error"
    spyOn(Category,"findByIdAndDelete").and.throwError(someError);
    const req:Partial<Request> = {
      params:{
        id:""
      },
    };
    const res:Partial<Response> = {
    };
    const mockNext = jest.fn().mockImplementation();
    await controller.deleteOne(req,res,mockNext);
    expect(mockNext).toHaveBeenCalled();
  });
});
