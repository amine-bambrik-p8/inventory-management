import { IUser } from '@workspace/interfaces';
import { Action } from '@ngrx/store';

export enum UsersActionTypes{
    LOAD_USERS='[Users] Load',
    USERS_LOADED='[Users] Loaded',
    CREATE_USER='[Users] Create',
    USER_CREATED='[Users] Created',
    UPDATE_USER='[Users] Update',
    USER_UPDATED='[Users] Updated',
    DELETE_USER='[Users] Delete',
    USER_DELETED='[Users] Deleted',
    READ_USER='[Users] Read]',
    USER_READ='[Users] Read Done]',
}

export class LoadUsers implements Action{
    public readonly type = UsersActionTypes.LOAD_USERS;
}

export class UsersLoaded implements Action{
    public readonly type = UsersActionTypes.USERS_LOADED;
    constructor(public payload: IUser[]){}
}

export class CreateUser implements Action{
    public readonly type = UsersActionTypes.CREATE_USER;
    constructor(public payload: IUser){}
}

export class UserCreated implements Action{
    public readonly type = UsersActionTypes.USER_CREATED;
    constructor(public payload: IUser){}
}

export class UpdateUser implements Action{
    public readonly type = UsersActionTypes.UPDATE_USER;
    constructor(public payload: IUser){}
}

export class UserUpdated implements Action{
    public readonly type = UsersActionTypes.USER_UPDATED;
    constructor(public payload: IUser){}
}


export class DeleteUser implements Action{
    public readonly type = UsersActionTypes.DELETE_USER;
    constructor(public payload: IUser){}
}

export class UserDeleted implements Action{
    public readonly type = UsersActionTypes.USER_DELETED;
    constructor(public payload: IUser){}
}

export class ReadUser implements Action{
    public readonly type = UsersActionTypes.READ_USER;
    constructor(public payload: IUser){}
}

export class UserRead implements Action{
    public readonly type = UsersActionTypes.USER_READ;
    constructor(public payload: IUser){}
}

export type UsersActions = LoadUsers |
UsersLoaded |
CreateUser |
UserCreated |
UpdateUser |
UserUpdated |
DeleteUser |
UserDeleted |
ReadUser |
UserRead