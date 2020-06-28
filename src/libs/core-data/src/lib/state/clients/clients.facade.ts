import { ClientsActionTypes, ClientsActions, UpdateClient, CreateClient, LoadClients, DeleteClient, ReadClient, isActionTypeSuccess, isActionTypeFail, UnsetSelectedClient } from './clients.actions';
import { Injectable } from "@angular/core";
import { ClientsState, selectAllClients, selectedClient } from './clients.reducer';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { filter, take } from 'rxjs/operators';
import { IClient } from '@workspace/interfaces';

@Injectable({
    providedIn:'root'
})
export class ClientsFacade{
    allClients$ = this.store.pipe(select(selectAllClients));
    selectedClient$ = this.store.pipe(select(selectedClient));
    
    actionCompleted$ = this.actions$
    .pipe(
        filter((action:ClientsActions) =>
        isActionTypeFail(action) || isActionTypeSuccess(action)
        ),
        take(1)
        );
        
        mutations$ = this.actions$
        .pipe(
            filter(action =>
                action.type === ClientsActionTypes.CREATE_CLIENT
                || action.type === ClientsActionTypes.UPDATE_CLIENT
                || action.type === ClientsActionTypes.DELETE_CLIENT
                )
                );
                
                constructor(private store: Store<ClientsState>,private actions$: ActionsSubject) {}
                
                readClient(id:string):Promise<void>{
        return this.dispatchAction(new ReadClient(id));
    }
    loadClients():Promise<void>{
        return this.dispatchAction(new LoadClients());
    }
    addClient(item:IClient):Promise<void>{
        return this.dispatchAction(new CreateClient(item));
    }
    updateClient(item:IClient):Promise<void>{
        return this.dispatchAction(new UpdateClient(item));
    }
    deleteClient(item:IClient):Promise<void>{
        return this.dispatchAction(new DeleteClient(item));
    }
    private async dispatchAction(action:ClientsActions):Promise<void>{
        this.store.dispatch(action);
        const response:any = await this.actionCompleted$.toPromise();
        if(isActionTypeFail(response)){
            const httpError = response.payload;
            throw httpError;
        }
    }
    unsetSelecetedClient(): void{
      this.store.dispatch(new UnsetSelectedClient());
    }
}