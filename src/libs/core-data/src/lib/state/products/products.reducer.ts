import { ProductsActions, ProductsActionTypes } from './products.actions';
import { IProduct } from '@workspace/interfaces';
import { EntityAdapter,EntityState,createEntityAdapter } from '@ngrx/entity';

export interface ProductsState extends EntityState<IProduct>{
    
}

const adapter: EntityAdapter<IProduct> = createEntityAdapter<IProduct>({
    selectId: (product: IProduct)=> product._id
});

export const initialState: ProductsState =  adapter.getInitialState({
    
});

export function productsReducers(state = initialState,action:ProductsActions): ProductsState{
    switch (action.type) {
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


const { selectIds , selectAll , selectEntities , selectTotal} = adapter.getSelectors();

export const selectProductsIds = selectIds;
export const selectAllProducts = selectAll;
export const selectProductsEntities = selectEntities;
export const selectProductsTotal = selectTotal;