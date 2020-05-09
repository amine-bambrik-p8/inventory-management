import { IClient } from '@workspace/interfaces';
import { ClientsLoaded, ClientsActionTypes, ClientCreated, CreateClient, ClientUpdated, UpdateClient, DeleteClient, LoadClients } from './clients.actions';
import { Observable } from 'rxjs';
import { ClientsState } from './clients.reducer';
import { DataPersistence } from '@nrwl/nx';
import { ClientsService } from './../../clients/clients.service';
import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn:"root",
})
export class ClientsEffects {
    @Effect()
    loadClients$: Observable<ClientsLoaded> = this.dataPersistence.fetch(ClientsActionTypes.LOAD_CLIENTS,{
        run:(action: LoadClients,state: ClientsState)=>{
            return this.clientsService
            .readMany()
            .pipe(
                map((clients:IClient[])=>{
                    return new ClientsLoaded(clients);
                })
            );
        },
        onError(action: LoadClients,error: any){
            console.log(error);
        }
    });
    @Effect()
    createClient$: Observable<ClientCreated> = this.dataPersistence.pessimisticUpdate(ClientsActionTypes.CREATE_CLIENT,{
        run:(action: CreateClient,state: ClientsState)=>{
            return this.clientsService
            .createOne(action.payload)
            .pipe(
                map((client: IClient)=>{
                    return new ClientCreated(client);
                })
            );
        },
        onError(action: CreateClient,error: any){
            console.log(error);
        }
    });
    @Effect()
    updateClient$: Observable<ClientUpdated> = this.dataPersistence.pessimisticUpdate(ClientsActionTypes.UPDATE_CLIENT,{
        run:(action: UpdateClient,state: ClientsState)=>{
            return this.clientsService
            .updateOne(action.payload._id,action.payload)
            .pipe(
                map((client: IClient)=>{
                    return new ClientUpdated(client);
                })
            );
        },
        onError(action: UpdateClient,error: any){
            console.log(error);
        }
    });
    @Effect()
    deleteClient$: Observable<ClientUpdated> = this.dataPersistence.pessimisticUpdate(ClientsActionTypes.DELETE_CLIENT,{
        run:(action: DeleteClient,state: ClientsState)=>{
            return this.clientsService
            .deleteOne(action.payload._id)
            .pipe(
                map((client: IClient)=>{
                    return new ClientUpdated(client);
                })
            );
        },
        onError(action: DeleteClient,error: any){
            console.log(error);
        }
    });
    constructor(
        private clientsService:ClientsService,
        private dataPersistence: DataPersistence<ClientsState>
        ){}
}