import { CategoriesActions, CategoriesActionTypes } from './categories.actions';
import { ICategory } from '@workspace/interfaces';
import { EntityAdapter,EntityState,createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface CategoriesState extends EntityState<ICategory>{
    selectedCategory:ICategory;
}

const adapter: EntityAdapter<ICategory> = createEntityAdapter<ICategory>({
    selectId: (category: ICategory)=> category._id
});

export const initialState: CategoriesState =  adapter.getInitialState({
    selectedCategory:null,
});

export function categoriesReducers(state = initialState,action:CategoriesActions): CategoriesState{
    switch (action.type) {
        case CategoriesActionTypes.CATEGORY_READ:
            return adapter.addOne(action.payload,state);
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
const selectCategoriesState = createFeatureSelector<CategoriesState>('categories');
const { selectIds , selectAll , selectEntities , selectTotal} = adapter.getSelectors();

export const selectCategoriesIds = createSelector(selectCategoriesState,selectIds);
export const selectAllCategories = createSelector(selectCategoriesState,selectAll);
export const selectCategoriesEntities = createSelector(selectCategoriesState,selectEntities);
export const selectCategoriesTotal = createSelector(selectCategoriesState,selectTotal);
export const selectedCategory = createSelector(selectCategoriesState,(state)=>state.selectedCategory);