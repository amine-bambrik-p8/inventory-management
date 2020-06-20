import { adapter } from './../products.reducer';
import { ProductEntriesActions, ProductEntriesActionTypes } from './product-entries.actions';
import { IProductEntry, IProduct } from '@workspace/interfaces';
import { initialState, ProductsState } from '../products.reducer';

export function productentysReducers(state:ProductsState = initialState,action:ProductEntriesActions): ProductsState{
    switch (action.type) {
        case ProductEntriesActionTypes.PRODUCT_ENTRY_CREATED:
        case ProductEntriesActionTypes.PRODUCT_ENTRIES_LOADED:
        case ProductEntriesActionTypes.PRODUCT_MAIN_ENTRY_SET:
        case ProductEntriesActionTypes.PRODUCT_ENTRY_DELETED:
        case ProductEntriesActionTypes.PRODUCT_ENTRY_UPDATED:
            const id:string = action.id;
            const changes:Partial<IProduct> = action.payload;
            return adapter.updateOne({
                id,
                changes,
            },state);
        default:
            return state;
    }
}
