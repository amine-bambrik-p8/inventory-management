import { IClient } from '@workspace/interfaces';
import { ClientsLoaded, ClientsActionTypes, ClientCreated, CreateClient, ClientUpdated, UpdateClient, DeleteClient, LoadClients, ReadClient, ClientRead, ClientsLoadFail, ClientCreateFail, ClientUpdateFail, ClientDeleteFail, ClientReadFail, ClientDeleted } from './clients.actions';
import { Observable, of } from 'rxjs';
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
    //@Effect()
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
            return of(new ClientsLoadFail(error));
        }
    })));
    //@Effect()
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
            return of(new ClientCreateFail(error));
        }
    })));
    //@Effect()
    updateClient$ = createEffect(()=>this.actions$.pipe(ofType(ClientsActionTypes.UPDATE_CLIENT),pessimisticUpdate({
        run:(action: UpdateClient,state: ClientsState)=>{
            const {_id:id,...changes} = action.payload;
            return this.clientsService
            .updateOne(id,changes)
            .pipe(
                map((client: IClient)=>{
                    return new ClientUpdated(client);
                })
            );
        },
        onError(action: UpdateClient,error: any){
            return of(new ClientUpdateFail(error));
        }
    })));
    //@Effect()
    deleteClient$ = createEffect(()=>this.actions$.pipe(ofType(ClientsActionTypes.DELETE_CLIENT),pessimisticUpdate({
        run:(action: DeleteClient,state: ClientsState)=>{
            return this.clientsService
            .deleteOne(action.payload._id)
            .pipe(
                map((client: IClient)=>{
                    return new ClientDeleted(client);
                })
            );
        },
        onError(action: DeleteClient,error: any){
            return of(new ClientDeleteFail(error));
        }
    })));
    //@Effect()
    readClients$ = createEffect(()=>this.actions$.pipe(ofType(ClientsActionTypes.READ_CLIENT),fetch({
        run:(action:ReadClient,state:ClientsState)=>{
            return this.clientsService
            .readOne(action.payload)
            .pipe(
                map((category:IClient)=>{
                    return new ClientRead(category)
                })
            );
        },
        onError(action: ReadClient,error:any){
            return of(new ClientReadFail(error));
        }
    })));
    constructor(
        private clientsService:ClientsService,
        private actions$: Actions
        ){}
}