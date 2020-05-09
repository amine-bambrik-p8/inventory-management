import { ProductEntriesActions, ProductEntriesActionTypes } from './product-entries.actions';
import { IProductEntry } from '@workspace/interfaces';
import { EntityAdapter,EntityState,createEntityAdapter } from '@ngrx/entity';

export interface ProductEntrysState extends EntityState<IProductEntry>{
    
}

const adapter: EntityAdapter<IProductEntry> = createEntityAdapter<IProductEntry>({
    selectId: (productEntry: IProductEntry)=> productEntry._id
});

export const initialState: ProductEntrysState =  adapter.getInitialState({
    
});

export function productentrysReducers(state = initialState,action:ProductEntriesActions): ProductEntrysState{
    switch (action.type) {
        default:
            return state;
    }
}