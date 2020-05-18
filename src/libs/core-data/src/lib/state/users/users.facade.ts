import { UsersActionTypes, UsersActions, UpdateUser, CreateUser, LoadUsers, DeleteUser } from './users.actions';
import { Injectable } from "@angular/core";
import { UsersState, selectAllUsers } from './users.reducer';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { filter } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class UsersFacade{
    allUsers$ = this.store.pipe(select(selectAllUsers));
    mutations$ = this.actions$
    .pipe(
      filter(action =>
        action.type === UsersActionTypes.CREATE_USER
        || action.type === UsersActionTypes.UPDATE_USER
        || action.type === UsersActionTypes.DELETE_USER
      )
    );
    constructor(private store: Store<UsersState>,private actions$: ActionsSubject) {}
    
    loadUsers() {
        this.store.dispatch(new LoadUsers());
    }
    
    addUser(item) {
        this.store.dispatch(new CreateUser(item));
    }
    
    updateUser(item) {
        this.store.dispatch(new UpdateUser(item));
    }
    
    deleteUser(item) {
        this.store.dispatch(new  DeleteUser(item));
    }
}