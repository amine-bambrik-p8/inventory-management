import { UsersState } from './users.reducer';
import { DataPersistence } from '@nrwl/nx';
import { UsersService } from './../../users/users.service';
import { UsersLoaded, UsersActionTypes, LoadUsers, UserCreated, CreateUser, UserDeleted, DeleteUser, UpdateUser, UserUpdated } from './users.actions';
import { Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { IUser } from '@workspace/interfaces';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn:"root",
})
export class UsersEffects {
    @Effect()
    loadUsers$: Observable<UsersLoaded> = this.dataPersistence.fetch(UsersActionTypes.LOAD_USERS,{
        run:(action: LoadUsers,state: UsersState)=>{
            return this.usersService
            .readMany()
            .pipe(
                map((users:IUser[])=>{
                    return new UsersLoaded(users);
                })
            );
        },
        onError(action: LoadUsers,error: any){
            console.log(error);
        }
    });
    @Effect()
    createUser$: Observable<UserCreated> = this.dataPersistence.fetch(UsersActionTypes.CREATE_USER,{
        run:(action: CreateUser,state: UsersState)=>{
            return this.usersService
            .createOne(action.payload)
            .pipe(
                map((user:IUser)=>{
                    return new UserCreated(user);
                })
            );
        },
        onError(action: CreateUser,error: any){
            console.log(error);
        }
    });
    @Effect()
    deleteUser$: Observable<UserDeleted> = this.dataPersistence.fetch(UsersActionTypes.DELETE_USER,{
        run:(action: DeleteUser,state: UsersState)=>{
            return this.usersService
            .deleteOne(action.payload._id,)
            .pipe(
                map((user:IUser)=>{
                    return new UserDeleted(user);
                })
            );
        },
        onError(action: DeleteUser,error: any){
            console.log(error);
        }
    });
    @Effect()
    updateUser$: Observable<UserUpdated> = this.dataPersistence.fetch(UsersActionTypes.UPDATE_USER,{
        run:(action: UpdateUser,state: UsersState)=>{
            const {_id:id,...changes} = action.payload;
            return this.usersService
            .updateOne(id,changes)
            .pipe(
                map((user:IUser)=>{
                    return new UserUpdated(user);
                })
            );
        },
        onError(action: UpdateUser,error: any){
            console.log(error);
        }
    });
    constructor(
        private usersService: UsersService,
        private dataPersistence: DataPersistence<UsersState>
    ){}
}