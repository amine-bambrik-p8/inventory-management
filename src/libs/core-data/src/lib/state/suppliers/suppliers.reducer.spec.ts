import { initialState } from './../categories/categories.reducer';
import { SuppliersActions, SuppliersLoaded, SupplierCreated, SupplierDeleted, SupplierUpdated } from './suppliers.actions';
import { ISupplier } from "@workspace/interfaces";
import { SuppliersState, suppliersReducers } from './suppliers.reducer';

describe("suppliers reducer",()=>{
    let someSuppliers: ISupplier[];
    let someInitState:SuppliersState;
    beforeEach(()=>{
        someSuppliers = [
            {
                _id:"someId",
                address:{
                    address:"someAddress",
                    city:"someCity",
                    zip:"somezip",
                },
                contact:{
                    email:"someemail",
                    firstName:"somefirstname",
                    lastName:"somelastname",
                    phoneNumber:"1235890",
                },
                name:"somename",
                picture:"somepicture"
            },
            {
                _id:"someOtherId",
                address:{
                    address:"someAddress",
                    city:"someCity",
                    zip:"somezip",
                },
                contact:{
                    email:"someemail",
                    firstName:"somefirstname",
                    lastName:"somelastname",
                    phoneNumber:"1235890",
                },
                name:"somename",
                picture:"somepicture"
            }
        ];
        someInitState = {
            ids:someSuppliers.map(s=>s._id),
            entities:someSuppliers.reduce((obj,s)=>{
                obj[s._id]=s;
                return obj;
            },{})
        };
    });
    describe("default",()=>{
        it("should return init state",()=>{
            const someAction = {
                type:"someAction",
                payload:{

                }
            };
            const expected = initialState;
            const result = suppliersReducers(undefined,someAction as SuppliersActions);
            expect(result).toEqual(expected);
        });
    });
    describe("Suppliers Loaded",()=>{
        it("should return a list of suppliers",()=>{
            const suppliersLoaded = new SuppliersLoaded(someSuppliers);
            const result = suppliersReducers(undefined,suppliersLoaded);
            expect(result.ids).toEqual(someSuppliers.map((s)=>s._id));
        });
    });
    describe("Supplier Created",()=>{
        it("should add the created supplier",()=>{
            const someSupplier = someSuppliers[0];
            const supplierCreated = new SupplierCreated(someSupplier);
            const result = suppliersReducers(undefined,supplierCreated);
            expect(result.entities).toHaveProperty(someSupplier._id);
        });
    });
    describe("Supplier Deleted",()=>{
        it("should delete the passed supplier",()=>{
            const someSupplier = someSuppliers[0];
            const supplierDeleted = new SupplierDeleted(someSupplier);
            const result = suppliersReducers(someInitState,supplierDeleted);
            expect(result.entities).not.toHaveProperty(someSupplier._id);
        });
    });
    describe("Supplier Updated",()=>{
        it("should update the passed supplier",()=>{
            const someSupplier = someSuppliers[0];
            const someUpdate = {...someSupplier,name:"someNewName"};
            const supplierUpdated= new SupplierUpdated(someUpdate);
            const result = suppliersReducers(someInitState,supplierUpdated);
            expect(result.entities[someSupplier._id]).toEqual(someUpdate);
        });
    });
});