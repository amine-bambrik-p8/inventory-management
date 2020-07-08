import { UsersActionTypes, UsersActions, UpdateUser, CreateUser, LoadUsers, DeleteUser, ReadUser } from './users.actions';
import { Injectable } from "@angular/core";
import { UsersState, selectAllUsers, selectedUser } from './users.reducer';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { IUser } from '@workspace/interfaces';

@Injectable({
    providedIn:'root'
})
export class UsersFacade{
    allUsers$ = this.store.pipe(select(selectAllUsers));
    selectedUser$ = this.store.pipe(select(selectedUser));
    mutations$ = this.actions$
    .pipe(
      filter(action =>
        action.type === UsersActionTypes.CREATE_USER
        || action.type === UsersActionTypes.UPDATE_USER
        || action.type === UsersActionTypes.DELETE_USER
      )
    );
    constructor(private store: Store<UsersState>,private actions$: ActionsSubject) {}
    readUser(id:string){
        this.store.dispatch(new ReadUser(id));
    }
    loadUsers() {
        this.store.dispatch(new LoadUsers());
    }
    
    addUser(item:IUser) {
        this.store.dispatch(new CreateUser(item));
    }
    
    updateUser(item:IUser) {
        this.store.dispatch(new UpdateUser(item));
    }
    
    deleteUser(item:IUser) {
        this.store.dispatch(new  DeleteUser(item));
    }
}