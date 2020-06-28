import { ProductsActions, ProductsActionTypes } from './products.actions';
import { IProduct } from '@workspace/interfaces';
import { EntityAdapter,EntityState,createEntityAdapter } from '@ngrx/entity';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProductEntriesActionTypes, ProductEntriesActions } from './product-entries/product-entries.actions';

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
            return adapter.upsertMany(action.payload,state);
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
            return productEntriesReducers(state,action as any);
    }
}


export function productEntriesReducers(state:ProductsState = initialState,action:ProductEntriesActions): ProductsState{
    switch (action.type) {
        case ProductEntriesActionTypes.PRODUCT_ENTRY_CREATED:
        case ProductEntriesActionTypes.PRODUCT_ENTRIES_LOADED:
        case ProductEntriesActionTypes.PRODUCT_MAIN_ENTRY_SET:
        case ProductEntriesActionTypes.PRODUCT_ENTRY_DELETED:
        case ProductEntriesActionTypes.PRODUCT_ENTRY_UPDATED:
            const id:string = action.id;
            const product:IProduct = action.payload;
            state = adapter.upsertOne(product,state);
            if(state.selectedProduct._id === id){
                state = {...state,selectedProduct:product}
            }
            return state;
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
export const selectProductByCodebar = createSelector(selectAllProducts,(products:IProduct[],props)=>products.find((entry)=>entry.codebar===props.codebar));
