import { ClientsActionTypes, ClientsActions, UpdateClient, CreateClient, LoadClients, DeleteClient } from './clients.actions';
import { Injectable } from "@angular/core";
import { ClientsState, selectAllClients } from './clients.reducer';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { filter } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class ClientsFacade{
    allClients$ = this.store.pipe(select(selectAllClients));
    mutations$ = this.actions$
    .pipe(
      filter(action =>
        action.type === ClientsActionTypes.CREATE_CLIENT
        || action.type === ClientsActionTypes.UPDATE_CLIENT
        || action.type === ClientsActionTypes.DELETE_CLIENT
      )
    );
    constructor(private store: Store<ClientsState>,private actions$: ActionsSubject) {}
    
    loadClients() {
        this.store.dispatch(new LoadClients());
    }
    
    addClient(item) {
        this.store.dispatch(new CreateClient(item));
    }
    
    updateClient(item) {
        this.store.dispatch(new UpdateClient(item));
    }
    
    deleteClient(item) {
        this.store.dispatch(new  DeleteClient(item));
    }
}