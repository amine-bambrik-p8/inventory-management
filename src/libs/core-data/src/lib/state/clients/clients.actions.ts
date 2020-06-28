import { IClient } from '@workspace/interfaces';
import { Action } from '@ngrx/store';

export enum ClientsActionTypes {
    LOAD_CLIENTS = '[Clients] Load',
    CLIENTS_LOADED = '[Clients] Loaded',
    CLIENTS_LOAD_FAIL = '[Clients] Load Fail',
    CREATE_CLIENT = '[Clients] Create',
    CLIENT_CREATED = '[Clients] Created',
    CLIENT_CREATE_FAIL = '[Clients] Create Fail',
    UPDATE_CLIENT = '[Clients] Update',
    CLIENT_UPDATE_FAIL = '[Clients] Update Fail',
    CLIENT_UPDATED = '[Clients] Updated',
    DELETE_CLIENT = '[Clients] Delete',
    CLIENT_DELETED = '[Clients] Deleted',
    CLIENT_DELETE_FAIL = '[Clients] Deleted Fail',
    READ_CLIENT = '[Clients] Read]',
    CLIENT_READ = '[Clients] Read Done]',
    CLIENT_READ_FAIL = '[Clients] Read Fail]',
    UNSET_SELECTED_CLIENT = "[Clients] Unset Seleceted Client"
}

export class LoadClients implements Action{
    public readonly type = ClientsActionTypes.LOAD_CLIENTS;
}

export class ClientsLoaded implements Action{
    public readonly type = ClientsActionTypes.CLIENTS_LOADED;
    constructor(public payload: IClient[]){}
}
export class ClientsLoadFail implements Action{
    public readonly type = ClientsActionTypes.CLIENTS_LOAD_FAIL;
    constructor(public payload: any){}
}

export class CreateClient implements Action{
    public readonly type = ClientsActionTypes.CREATE_CLIENT;
    constructor(public payload: IClient){}
}

export class ClientCreated implements Action{
    public readonly type = ClientsActionTypes.CLIENT_CREATED;
    constructor(public payload: IClient){}
}
export class ClientCreateFail implements Action{
    public readonly type = ClientsActionTypes.CLIENT_CREATE_FAIL;
    constructor(public payload: any){}
}

export class UpdateClient implements Action{
    public readonly type = ClientsActionTypes.UPDATE_CLIENT;
    constructor(public payload: IClient){}
}

export class ClientUpdated implements Action{
    public readonly type = ClientsActionTypes.CLIENT_UPDATED;
    constructor(public payload: IClient){}
}
export class ClientUpdateFail implements Action{
    public readonly type = ClientsActionTypes.CLIENT_UPDATE_FAIL;
    constructor(public payload: any){}
}


export class DeleteClient implements Action{
    public readonly type = ClientsActionTypes.DELETE_CLIENT;
    constructor(public payload: IClient){}
}

export class ClientDeleted implements Action{
    public readonly type = ClientsActionTypes.CLIENT_DELETED;
    constructor(public payload: IClient){}
}
export class ClientDeleteFail implements Action{
    public readonly type = ClientsActionTypes.CLIENT_DELETE_FAIL;
    constructor(public payload: any){}
}

export class ReadClient implements Action{
    public readonly type = ClientsActionTypes.READ_CLIENT;
    constructor(public payload: string){}
}

export class ClientRead implements Action{
    public readonly type = ClientsActionTypes.CLIENT_READ;
    constructor(public payload: IClient){}
}

export class ClientReadFail implements Action{
    public readonly type = ClientsActionTypes.CLIENT_READ_FAIL;
    constructor(public payload: any){}
}

export class UnsetSelectedClient implements Action{
    public readonly type = ClientsActionTypes.UNSET_SELECTED_CLIENT;
    constructor(){}
}

export const isActionTypeFail = (action:ClientsActions):boolean => {
    return action.type === ClientsActionTypes.CLIENTS_LOAD_FAIL
        || action.type === ClientsActionTypes.CLIENT_UPDATE_FAIL
        || action.type === ClientsActionTypes.CLIENT_DELETE_FAIL
        || action.type === ClientsActionTypes.CLIENT_CREATE_FAIL
        || action.type === ClientsActionTypes.CLIENT_READ_FAIL
}
export const isActionTypeSuccess = (action:ClientsActions):boolean => {
    return action.type === ClientsActionTypes.CLIENTS_LOADED
        || action.type === ClientsActionTypes.CLIENT_UPDATED
        || action.type === ClientsActionTypes.CLIENT_DELETED
        || action.type === ClientsActionTypes.CLIENT_CREATED
        || action.type === ClientsActionTypes.CLIENT_READ
}

export type ClientsActions = LoadClients |
ClientsLoaded |
ClientsLoadFail |
CreateClient |
ClientCreated |
ClientCreateFail |
UpdateClient |
ClientUpdated |
ClientUpdateFail |
DeleteClient |
ClientDeleted |
ClientDeleteFail |
ReadClient |
ClientRead |
UnsetSelectedClient |
ClientReadFail;