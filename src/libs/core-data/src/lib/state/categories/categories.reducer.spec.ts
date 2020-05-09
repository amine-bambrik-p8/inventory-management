import { ICategory } from '@workspace/interfaces';
import { initialState, categoriesReducers, CategoriesState } from './categories.reducer';
import { CategoriesActions, LoadCategories, CategoriesLoaded, CategoryCreated, CategoryDeleted, CategoryUpdated } from './categories.actions';
describe("categories reducer",()=>{
    let someCategories:ICategory[];
    let someInitState: CategoriesState;
    beforeEach(()=>{
        someCategories =[
            {
                _id:"someid",
                name:"somename",
            },
            {
                _id:"someOtherId",
                name:"another name"
            }
        ];
        someInitState={
            entities:someCategories.reduce((obj,c)=>{
                obj[c._id] = c;
                return obj
            },{}),
            ids:someCategories.map((c)=>c._id)
        }
    })
    describe("default",()=>{
        it("should return init state",()=>{
            const someAction = {
                type:"someAction",
                payload:{

                }
            };
            const expected = initialState;
            const result = categoriesReducers(undefined,someAction as CategoriesActions);
            expect(result).toBe(expected);
        });
    });
    describe("Categories Loaded",()=>{
        it("should return a list of categories",()=>{
            const categoriesLoaded = new CategoriesLoaded(someCategories);
            const result = categoriesReducers(undefined,categoriesLoaded);
            expect(result.ids).toEqual(someCategories.map((c)=>c._id));
        });
    });
    describe("Category Created",()=>{
        it("should add the created category",()=>{
            const someCategory: ICategory = someCategories[0];
            const categoryCreated = new CategoryCreated(someCategory);
            const result = categoriesReducers(undefined,categoryCreated);
            expect(result.entities).toHaveProperty(someCategory._id);
        });
    });
    describe("Category Deleted",()=>{
        it("should delete the passed category",()=>{
            const someCategory: ICategory = someCategories[0];
            const categoryDeleted = new CategoryDeleted(someCategory);
            const result = categoriesReducers(someInitState,categoryDeleted);
            expect(result.entities).not.toHaveProperty(someCategory._id);
        });
    });
    describe("Category Updated",()=>{
        it("should update the passed category",()=>{
            const someCategory: ICategory = someCategories[0]
            const someState: CategoriesState = someInitState;
            const someUpdate = {...someCategory,name:"someOtherName"};
            const categoryUpdated = new CategoryUpdated(someUpdate);
            const result = categoriesReducers(someState,categoryUpdated);
            expect(result.entities[someCategory._id]).toEqual(someUpdate);
        });
    });
});