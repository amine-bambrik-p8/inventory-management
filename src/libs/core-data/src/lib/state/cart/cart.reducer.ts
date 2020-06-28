import { selectedOrder } from './../orders/orders.reducer';

import { selectAllProducts } from './../products/products.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CartActions, CartActionTypes } from './cart.actions';
import { IOrderEntry, ICartItem, IProduct, IProductEntry, IOrder } from '@workspace/interfaces';

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
        case CartActionTypes.ADD_PRODUCT_TO_CART:
            let orderEntry:IOrderEntry;
            const productId = action.payload._id;
            if (state.selectedOrderEntry && state.selectedOrderEntry.productId !== productId){
                state = adapter.upsertOne(state.selectedOrderEntry,state);
            }else if(state.selectedOrderEntry){
                orderEntry = state.selectedOrderEntry;
            }
            orderEntry = orderEntry || state.entities[productId] || {productId,quantity:0};
            orderEntry={...orderEntry,quantity:orderEntry.quantity+1};
            return {
                ...state,
                selectedOrderEntry:{...orderEntry}
            }
        case CartActionTypes.DELETE_PRODUCT_FROM_CART:
            let selectedOrderEntry = state.selectedOrderEntry;
            if(selectedOrderEntry && action.payload === selectedOrderEntry.productId){
                selectedOrderEntry = null;
            }
            return {...adapter.removeOne(action.payload,state),selectedOrderEntry};
        case CartActionTypes.UNSET_SELECTED_ORDER_ENTRY:
            return {...state,selectedOrderEntry:null};
        case CartActionTypes.SET_SELECTED_ORDER_ENTRY:
            return {...state,selectedOrderEntry:state.entities[action.payload]}
        case CartActionTypes.UPDATE_ORDER_ENTRY:
            return adapter.upsertOne(action.payload,state);
        case CartActionTypes.CLEAR_CART:
            return {...adapter.removeAll(state),selectedOrderEntry:null};
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
export const selectedOrderEntry = createSelector(selectCartState,(state)=>state.selectedOrderEntry);
export const selectCartItems = createSelector(selectAllProducts,
    selectAllOrderEntries,
    (products,orderEntries)=>
        orderEntries.map(
            (entry)=>{
                const product = products
                    .find(
                        product=>
                            product._id===entry.productId
                    )
                const mainEntry:IProductEntry = product.entries.find(entry=>entry._id===product.mainEntryId);
                const cartItem: ICartItem = {
                    "_id":product._id,
                    "discount":mainEntry.discount,
                    "name":product.name,
                    "price":mainEntry.price,
                    "quantity":entry.quantity
                }
                return cartItem;
            }
        )
);
