import { UsersActionTypes, UsersActions, UpdateUser, CreateUser, LoadUsers, DeleteUser, ReadUser, isActionTypeFail, isActionTypeSuccess } from './users.actions';
import { Injectable } from "@angular/core";
import { UsersState, selectAllUsers, selectedUser } from './users.reducer';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { filter, take } from 'rxjs/operators';
import { IUser } from '@workspace/interfaces';

@Injectable({
    providedIn:'root'
})
export class UsersFacade{
    allUsers$ = this.store.pipe(select(selectAllUsers));
    selectedUser$ = this.store.pipe(select(selectedUser));
    actionCompleted$ = this.actions$
    .pipe(
        filter((action:UsersActions) =>
            isActionTypeFail(action) || isActionTypeSuccess(action)
        ),
        take(1)
    );
    mutations$ = this.actions$
    .pipe(
      filter(action =>
        action.type === UsersActionTypes.CREATE_USER
        || action.type === UsersActionTypes.UPDATE_USER
        || action.type === UsersActionTypes.DELETE_USER
      )
    );
    constructor(private store: Store<UsersState>,private actions$: ActionsSubject) {}
    readUser(id:string):Promise<void>{
        return this.dispatchAction(new ReadUser(id));
    }
    loadUsers():Promise<void>{
        return this.dispatchAction(new LoadUsers());
    }
    addUser(item:IUser):Promise<void>{
        return this.dispatchAction(new CreateUser(item));
    }
    updateUser(item:IUser):Promise<void>{
        return this.dispatchAction(new UpdateUser(item));
    }
    deleteUser(item:IUser):Promise<void>{
        return this.dispatchAction(new DeleteUser(item));
    }
    private async dispatchAction(action:UsersActions):Promise<void>{
        this.store.dispatch(action);
        const response:any = await this.actionCompleted$.toPromise();
        if(isActionTypeFail(response)){
            const httpError = response.payload;
            throw httpError;
        }
    }
}