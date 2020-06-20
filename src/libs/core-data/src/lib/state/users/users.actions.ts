import { IUser } from '@workspace/interfaces';
import { Action } from '@ngrx/store';

export enum UsersActionTypes{
    LOAD_USERS='[Users] Load',
    USERS_LOADED='[Users] Loaded',
    USERS_LOAD_FAIL='[Users] Load FAIL',
    CREATE_USER='[Users] Create',
    USER_CREATED='[Users] Created',
    USER_CREATE_FAIL='[Users] Create Fail',
    UPDATE_USER='[Users] Update',
    USER_UPDATED='[Users] Updated',
    USER_UPDATE_FAIL='[Users] Update Fail',
    DELETE_USER='[Users] Delete',
    USER_DELETED='[Users] Deleted',
    USER_DELETE_FAIL='[Users] Delete Fail',
    READ_USER='[Users] Read]',
    USER_READ='[Users] Read Done]',
    USER_READ_FAIL='[Users] Read Fail]',
}

export class LoadUsers implements Action{
    public readonly type = UsersActionTypes.LOAD_USERS;
}

export class UsersLoaded implements Action{
    public readonly type = UsersActionTypes.USERS_LOADED;
    constructor(public payload: IUser[]){}
}
export class UsersLoadFail implements Action{
    public readonly type = UsersActionTypes.USERS_LOAD_FAIL;
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
export class UserCreateFail implements Action{
    public readonly type = UsersActionTypes.USER_CREATE_FAIL;
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
export class UserUpdateFail implements Action{
    public readonly type = UsersActionTypes.USER_UPDATE_FAIL;
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
export class UserDeleteFail implements Action{
    public readonly type = UsersActionTypes.USER_DELETE_FAIL;
    constructor(public payload: IUser){}
}

export class ReadUser implements Action{
    public readonly type = UsersActionTypes.READ_USER;
    constructor(public payload: string){}
}

export class UserRead implements Action{
    public readonly type = UsersActionTypes.USER_READ;
    constructor(public payload: IUser){}
}

export class UserReadFail implements Action{
    public readonly type = UsersActionTypes.USER_READ_FAIL;
    constructor(public payload: IUser){}
}

export const isActionTypeFail = (action:UsersActions):boolean => {
    return action.type === UsersActionTypes.USERS_LOAD_FAIL
        || action.type === UsersActionTypes.USER_UPDATE_FAIL
        || action.type === UsersActionTypes.USER_DELETE_FAIL
        || action.type === UsersActionTypes.USER_CREATE_FAIL
        || action.type === UsersActionTypes.USER_READ_FAIL
}
export const isActionTypeSuccess = (action:UsersActions):boolean => {
    return action.type === UsersActionTypes.USERS_LOADED
        || action.type === UsersActionTypes.USER_UPDATED
        || action.type === UsersActionTypes.USER_DELETED
        || action.type === UsersActionTypes.USER_CREATED
        || action.type === UsersActionTypes.USER_READ
}

export type UsersActions = LoadUsers |
UsersLoaded |
UsersLoadFail |
CreateUser |
UserCreated |
UserCreateFail |
UpdateUser |
UserUpdated |
UserUpdateFail |
DeleteUser |
UserDeleted |
UserDeleteFail |
ReadUser |
UserRead |
UserReadFail; 