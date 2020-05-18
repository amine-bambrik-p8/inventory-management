import { ClientsActions, ClientsActionTypes } from './clients.actions';
import { IClient } from '@workspace/interfaces';
import { EntityAdapter,EntityState,createEntityAdapter } from '@ngrx/entity';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export interface ClientsState extends EntityState<IClient>{
    
}

const adapter: EntityAdapter<IClient> = createEntityAdapter<IClient>({
    selectId: (client: IClient)=> client._id
});

export const initialState: ClientsState =  adapter.getInitialState({
    
});

export function clientsReducers(state = initialState,action:ClientsActions): ClientsState{
    switch (action.type) {
        case ClientsActionTypes.CLIENTS_LOADED:
            return adapter.setAll(action.payload,state);
        case ClientsActionTypes.CLIENT_CREATED:
            return adapter.addOne(action.payload,state);
        case ClientsActionTypes.CLIENT_DELETED:
            return adapter.removeOne(action.payload._id,state);
        case ClientsActionTypes.CLIENT_UPDATED:
            const {_id:id,...changes} = action.payload;
            return adapter.updateOne({
                id,
                changes,
            },state);
        default:
            return state;
    }
}


const selectClientsState = createFeatureSelector<ClientsState>('clients');
const { selectIds , selectAll , selectEntities , selectTotal} = adapter.getSelectors();

export const selectClientsIds = createSelector(selectClientsState,selectIds);
export const selectAllClients = createSelector(selectClientsState,selectAll);
export const selectClientsEntities = createSelector(selectClientsState,selectEntities);
export const selectClientsTotal = createSelector(selectClientsState,selectTotal);