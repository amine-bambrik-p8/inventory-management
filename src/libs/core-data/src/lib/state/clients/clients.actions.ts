import { IClient } from '@workspace/interfaces';
import { Action } from '@ngrx/store';

export enum ClientsActionTypes{
    LOAD_CLIENTS='[Clients] Load',
    CLIENTS_LOADED='[Clients] Loaded',
    CREATE_CLIENT='[Clients] Create',
    CLIENT_CREATED='[Clients] Created',
    UPDATE_CLIENT='[Clients] Update',
    CLIENT_UPDATED='[Clients] Updated',
    DELETE_CLIENT='[Clients] Delete',
    CLIENT_DELETED='[Clients] Deleted',
    READ_CLIENT='[Clients] Read]',
    CLIENT_READ='[Clients] Read Done]',
}

export class LoadClients implements Action{
    public readonly type = ClientsActionTypes.LOAD_CLIENTS;
}

export class ClientsLoaded implements Action{
    public readonly type = ClientsActionTypes.CLIENTS_LOADED;
    constructor(public payload: IClient[]){}
}

export class CreateClient implements Action{
    public readonly type = ClientsActionTypes.CREATE_CLIENT;
    constructor(public payload: IClient){}
}

export class ClientCreated implements Action{
    public readonly type = ClientsActionTypes.CLIENT_CREATED;
    constructor(public payload: IClient){}
}

export class UpdateClient implements Action{
    public readonly type = ClientsActionTypes.UPDATE_CLIENT;
    constructor(public payload: IClient){}
}

export class ClientUpdated implements Action{
    public readonly type = ClientsActionTypes.CLIENT_UPDATED;
    constructor(public payload: IClient){}
}


export class DeleteClient implements Action{
    public readonly type = ClientsActionTypes.DELETE_CLIENT;
    constructor(public payload: IClient){}
}

export class ClientDeleted implements Action{
    public readonly type = ClientsActionTypes.CLIENT_DELETED;
    constructor(public payload: IClient){}
}

export class ReadClient implements Action{
    public readonly type = ClientsActionTypes.READ_CLIENT;
    constructor(public payload: string){}
}

export class ClientRead implements Action{
    public readonly type = ClientsActionTypes.CLIENT_READ;
    constructor(public payload: IClient){}
}

export type ClientsActions = LoadClients |
ClientsLoaded |
CreateClient |
ClientCreated |
UpdateClient |
ClientUpdated |
DeleteClient |
ClientDeleted |
ReadClient |
ClientRead