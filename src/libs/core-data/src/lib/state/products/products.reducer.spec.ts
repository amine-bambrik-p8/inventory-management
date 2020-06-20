import { ProductsActions, ProductsLoaded, ProductCreated, ProductDeleted, ProductUpdated } from './products.actions';
import { ProductsState, initialState, productsReducers } from './products.reducer';
import { IProduct } from '@workspace/interfaces';
describe("products reducer",()=>{
    let someProducts:IProduct[];
    let someInitState:ProductsState;
    beforeEach(()=>{
        someProducts = [
            {
                _id:"someId",
                name:"someName",
                supplier:{
                    id:"someSupplier"
                },
                category:{
                    id:"someSupplier"
                },
                codebar:"somecodebar",
                entries:[],
                description:"someDescription",
                mainEntryId:"someId",
                thumbnails:[
                    {
                        path:"someuri"
                    }
                ],
                quantityAlert:{
                    maxQuantity:23,
                    minQuantity:12
                }
            },
            {
                _id:"someOtherId",
                name:"someName",
                supplier:{
                    id:"someSupplier"
                },
                category:{
                    id:"someSupplier"
                },
                codebar:"somecodebar",
                entries:[],
                description:"someDescription",
                mainEntryId:"someId",
                thumbnails:[
                    {
                        path:"someuri"
                    }
                ],
                quantityAlert:{
                    maxQuantity:23,
                    minQuantity:12
                }
            }
        ];
        someInitState = {
            ids:someProducts.map(p=>p._id),
            entities:someProducts.reduce((obj,p)=>{
                obj[p._id]=p;
                return obj;
            },{}),
            selectedProduct:null
        };
    });
    describe("default",()=>{
        it("should return init state",()=>{
            const someAction = {
                type:"someAction",
                payload:{}
            };
            const expected = initialState;
            const result = productsReducers(undefined,someAction as ProductsActions);
            expect(result).toBe(expected);
        });
    });
    describe("Products Loaded",()=>{
        it("should return a list of products",()=>{
            const productsLoaded = new ProductsLoaded(someProducts);
            const result = productsReducers(undefined,productsLoaded);
            expect(result.ids).toEqual(someProducts.map(p=>p._id));
        });
    });
    describe("Product Created",()=>{
        it("should add the created product",()=>{
            const someProduct = someProducts[0];
            const productCreated = new ProductCreated(someProduct);
            const result = productsReducers(undefined,productCreated);
            expect(result.entities).toHaveProperty(someProduct._id);
        });
    });
    describe("Product Deleted",()=>{
        it("should delete the passed product",()=>{
            const someProduct = someProducts[0];
            const productDeleted = new ProductDeleted(someProduct);
            const result = productsReducers(someInitState,productDeleted);
            expect(result.entities).not.toHaveProperty(someProduct._id);
        });
    });
    describe("Product Updated",()=>{
        it("should update the passed product",()=>{
            const someProduct = someProducts[0];
            const someUpdate = {...someProduct,name:"someNewName"};
            const productUpdated = new ProductUpdated(someUpdate);
            const result = productsReducers(someInitState,productUpdated);
            expect(result.entities[someProduct._id]).toEqual(someUpdate);
        });
    });
});