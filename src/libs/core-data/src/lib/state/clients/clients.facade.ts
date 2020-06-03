import { ClientsActionTypes, ClientsActions, UpdateClient, CreateClient, LoadClients, DeleteClient, ReadClient } from './clients.actions';
import { Injectable } from "@angular/core";
import { ClientsState, selectAllClients, selectedClient } from './clients.reducer';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { IClient } from '@workspace/interfaces';

@Injectable({
    providedIn:'root'
})
export class ClientsFacade{
    allClients$ = this.store.pipe(select(selectAllClients));
    selectedClient$ = this.store.pipe(select(selectedClient));
    mutations$ = this.actions$
    .pipe(
      filter(action =>
        action.type === ClientsActionTypes.CREATE_CLIENT
        || action.type === ClientsActionTypes.UPDATE_CLIENT
        || action.type === ClientsActionTypes.DELETE_CLIENT
      )
    );
    constructor(private store: Store<ClientsState>,private actions$: ActionsSubject) {}
    readClient(id:string):void{
        this.store.dispatch(new ReadClient(id));
    }
    loadClients():void{
        this.store.dispatch(new LoadClients());
    }
    
    addClient(item:IClient):void{
        this.store.dispatch(new CreateClient(item));
    }
    
    updateClient(item:IClient):void{
        this.store.dispatch(new UpdateClient(item));
    }
    
    deleteClient(item:IClient):void{
        this.store.dispatch(new  DeleteClient(item));
    }
}