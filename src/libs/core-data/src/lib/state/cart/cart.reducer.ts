import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CartActions, CartActionTypes } from './cart.actions';
import { IOrderEntry } from '@workspace/interfaces';

export interface CartState extends EntityState<any>{
    selectedOrderEntry:IOrderEntry
}

const adapter:EntityAdapter<IOrderEntry> = createEntityAdapter<IOrderEntry>({
    selectId: (orderEntry: IOrderEntry) => orderEntry.productId
});

export const initialState: CartState = adapter.getInitialState({
    selectedOrderEntry:null
});

export function cartReducer(state = initialState,action: CartActions): CartState{
    switch (action.type) {
        case CartActionTypes.ADD_ORDER_ENTRY:
            return adapter.addOne(action.payload,state);
        case CartActionTypes.DELETE_ORDER_ENTRY:
            return adapter.removeOne(action.payload.productId,state);
        case CartActionTypes.SELECT_ORDER_ENTRY:
            return {
                ...state,
                selectedOrderEntry:action.payload
            }
        case CartActionTypes.UPDATE_ORDER_ENTRY:
            const {productId:id,...changes} = action.payload;
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

const selectCartState = createFeatureSelector<CartState>('cart');
const { selectIds , selectAll , selectEntities , selectTotal} = adapter.getSelectors();

export const selectOrderEntryId = createSelector(selectCartState,selectIds);
export const selectAllOrderEntries = createSelector(selectCartState,selectAll);
export const selectOrderEntriesEntities = createSelector(selectCartState,selectEntities);
export const selectOrderEntriesTotal = createSelector(selectCartState,selectTotal);