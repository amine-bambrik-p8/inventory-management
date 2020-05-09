import { CategoriesActions, CategoriesActionTypes } from './categories.actions';
import { ICategory } from '@workspace/interfaces';
import { EntityAdapter,EntityState,createEntityAdapter } from '@ngrx/entity';

export interface CategoriesState extends EntityState<ICategory>{
    
}

const adapter: EntityAdapter<ICategory> = createEntityAdapter<ICategory>({
    selectId: (category: ICategory)=> category._id
});

export const initialState: CategoriesState =  adapter.getInitialState({

});

export function categoriesReducers(state = initialState,action:CategoriesActions): CategoriesState{
    switch (action.type) {
        case CategoriesActionTypes.CATEGORIES_LOADED:
            return adapter.setAll(action.payload,state);
        case CategoriesActionTypes.CATEGORY_CREATED:
            return adapter.addOne(action.payload,state);
        case CategoriesActionTypes.CATEGORY_DELETED:
            return adapter.removeOne(action.payload._id,state);
        case CategoriesActionTypes.CATEGORY_UPDATED:
            const {_id:id,...changes} = action.payload;
            return adapter.updateOne(
                {
                    id,
                    changes
                }
                ,state);
        default:
            return state;
    }
}

const { selectIds , selectAll , selectEntities , selectTotal} = adapter.getSelectors();

export const selectCategoriesIds = selectIds;
export const selectAllCategories = selectAll;
export const selectCategoriesEntities = selectEntities;
export const selectCategoriesTotal = selectTotal;