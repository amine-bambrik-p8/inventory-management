import { IClient } from '@workspace/interfaces';
import { ClientsLoaded, ClientsActionTypes, ClientCreated, CreateClient, ClientUpdated, UpdateClient, DeleteClient, LoadClients } from './clients.actions';
import { Observable } from 'rxjs';
import { ClientsState } from './clients.reducer';
import { ClientsService } from './../../clients/clients.service';
import { Injectable } from '@angular/core';
import { Effect, Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { fetch, pessimisticUpdate } from '@nrwl/angular';

@Injectable({
    providedIn:"root",
})
export class ClientsEffects {
    @Effect()
    loadClients$ = createEffect(()=>this.actions$.pipe(ofType(ClientsActionTypes.LOAD_CLIENTS),fetch({
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
    })));
    @Effect()
    createClient$ = createEffect(()=>this.actions$.pipe(ofType(ClientsActionTypes.CREATE_CLIENT),pessimisticUpdate({
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
    })));
    @Effect()
    updateClient$ = createEffect(()=>this.actions$.pipe(ofType(ClientsActionTypes.UPDATE_CLIENT),pessimisticUpdate({
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
    })));
    @Effect()
    deleteClient$ = createEffect(()=>this.actions$.pipe(ofType(ClientsActionTypes.DELETE_CLIENT),pessimisticUpdate({
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
    })));
    constructor(
        private clientsService:ClientsService,
        private actions$: Actions
        ){}
}