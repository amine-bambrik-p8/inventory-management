import { ProductsActions, ProductsActionTypes } from './products.actions';
import { IProduct } from '@workspace/interfaces';
import { EntityAdapter,EntityState,createEntityAdapter } from '@ngrx/entity';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { selectAllSuppliers } from '../suppliers/suppliers.reducer';
import { selectAllCategories } from '../categories/categories.reducer';

export interface ProductsState extends EntityState<IProduct>{
    selectedProduct?:IProduct;
}

export const adapter: EntityAdapter<IProduct> = createEntityAdapter<IProduct>({
    selectId: (product: IProduct)=> product._id
});

export const initialState: ProductsState =  adapter.getInitialState({
});

export function productsReducers(state = initialState,action:ProductsActions): ProductsState{
    switch (action.type) {
        case ProductsActionTypes.PRODUCT_READ:
            return {...state,selectedProduct:action.payload};
        case ProductsActionTypes.PRODUCTS_LOADED:
            return adapter.setAll(action.payload,state);
        case ProductsActionTypes.PRODUCT_CREATED:
            return adapter.addOne(action.payload,state);
        case ProductsActionTypes.PRODUCT_DELETED:
            return adapter.removeOne(action.payload._id,state);
        case ProductsActionTypes.PRODUCT_UPDATED:
            const {_id:id,...changes} = action.payload;
            return adapter.updateOne({
                id,
                changes,
            },state);
        default:
            return state;
    }
}


const selectProductsState = createFeatureSelector<ProductsState>('products');
const { selectIds , selectAll , selectEntities , selectTotal} = adapter.getSelectors();

export const selectProductsIds = createSelector(selectProductsState,selectIds);
export const selectAllProducts = createSelector(selectProductsState,selectAll);
export const selectProductsEntities = createSelector(selectProductsState,selectEntities);
export const selectProductsTotal = createSelector(selectProductsState,selectTotal);
export const selectedProduct = createSelector(selectProductsState,(state)=>state.selectedProduct);