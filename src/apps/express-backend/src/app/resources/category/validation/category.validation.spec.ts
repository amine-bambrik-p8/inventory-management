import { ICategory } from '@workspace/interfaces';
import { categoryValidation } from './category.validation';
describe("Category Validation",()=>{
    let someValidCategory:ICategory;
    beforeEach(()=>{
        someValidCategory={
            name:"Some name",
        };
    });
    it("should succeed when a valid category is passed",()=>{
        const {error} = categoryValidation.validate(someValidCategory);
        expect(error).toBeFalsy();
    });
    it("should fail when the category doesn't have a name",()=>{
        const {name,...someCategoryWithoutName} = someValidCategory;
        const {error} = categoryValidation.validate(someCategoryWithoutName);
        expect(error).toBeTruthy();
    });
    it("should fail when the category name length is more then 60",()=>{
        const someLongName = "something".repeat(12);
        const someCategoryLongName = {name:someLongName};
        const {error} = categoryValidation.validate(someCategoryLongName);
        expect(error).toBeTruthy();
    });
})
