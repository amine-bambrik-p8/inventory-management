import { SuppliersActions, SuppliersActionTypes } from './suppliers.actions';
import { ISupplier } from '@workspace/interfaces';
import { EntityAdapter,EntityState,createEntityAdapter } from '@ngrx/entity';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export interface SuppliersState extends EntityState<ISupplier>{
    selectedSupplier?:ISupplier;
}

const adapter: EntityAdapter<ISupplier> = createEntityAdapter<ISupplier>({
    selectId: (supplier: ISupplier)=> supplier._id
});

export const initialState: SuppliersState =  adapter.getInitialState({
});

export function suppliersReducers(state = initialState,action:SuppliersActions): SuppliersState{
    switch (action.type) {
        case SuppliersActionTypes.SUPPLIER_READ:
            return {...state,selectedSupplier:action.payload};
        case SuppliersActionTypes.SUPPLIERS_LOADED:
            return adapter.setAll(action.payload,state);
        case SuppliersActionTypes.SUPPLIER_CREATED:
            return adapter.addOne(action.payload,state);
        case SuppliersActionTypes.SUPPLIER_DELETED:
            return adapter.removeOne(action.payload._id,state);
        case SuppliersActionTypes.SUPPLIER_UPDATED:
            const {_id:id,...changes} = action.payload;
            return adapter.updateOne({
                id,
                changes,
            },state);
        default:
            return state;
    }
}

const selectSuppliersState = createFeatureSelector<SuppliersState>('suppliers');
const { selectIds , selectAll , selectEntities , selectTotal} = adapter.getSelectors();

export const selectSuppliersIds = createSelector(selectSuppliersState,selectIds);
export const selectAllSuppliers = createSelector(selectSuppliersState,selectAll);
export const selectSuppliersEntities = createSelector(selectSuppliersState,selectEntities);
export const selectSuppliersTotal = createSelector(selectSuppliersState,selectTotal);
export const selectedSupplier = createSelector(selectSuppliersState,(state:SuppliersState)=>state.selectedSupplier);