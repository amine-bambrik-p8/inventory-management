import { UsersState } from './users.reducer';
import { UsersService } from './../../users/users.service';
import { UsersLoaded, UsersActionTypes, LoadUsers, UserCreated, CreateUser, UserDeleted, DeleteUser, UpdateUser, UserUpdated, ReadUser, UserRead } from './users.actions';
import { Effect, Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { IUser } from '@workspace/interfaces';
import { map, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {optimisticUpdate,fetch, pessimisticUpdate} from '@nrwl/angular'
@Injectable({
    providedIn:"root",
})
export class UsersEffects {
    //@Effect()
    loadUsers$ = createEffect(()=>
        this.actions$.pipe(
            ofType(UsersActionTypes.LOAD_USERS),
            fetch({
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
                    return null;
                }
            })
        )
    )
    // loadUsers$: Observable<UsersLoaded> = this.dataPersistence.fetch(UsersActionTypes.LOAD_USERS,{
    //     run:(action: LoadUsers,state: UsersState)=>{
    //         return this.usersService
    //         .readMany()
    //         .pipe(
    //             map((users:IUser[])=>{
    //                 return new UsersLoaded(users);
    //             })
    //         );
    //     },
    //     onError(action: LoadUsers,error: any){
    //         console.log(error);
    //     }
    // });
    //@Effect()
    createUser$ = createEffect(()=>this.actions$.pipe(ofType(UsersActionTypes.CREATE_USER),pessimisticUpdate({
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
    })));
    //@Effect()
    deleteUser$ =createEffect(()=>
    this.actions$
    .pipe(
        ofType(UsersActionTypes.DELETE_USER),
        pessimisticUpdate({
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
    })));
    //@Effect()
    updateUser$= createEffect(()=>
    this.actions$.pipe(
        ofType(UsersActionTypes.UPDATE_USER),
        pessimisticUpdate({
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
    })));
    //@Effect()
    readUser$ = createEffect(()=>this.actions$.pipe(ofType(UsersActionTypes.READ_USER),fetch({
        run:(action:ReadUser,state:UsersState)=>{
            return this.usersService
            .readOne(action.payload)
            .pipe(
                map((category:IUser)=>{
                    return new UserRead(category)
                })
            );
        },
        onError(action: ReadUser,error:any){
            console.error(error);
        }
    })));
    constructor(
        private usersService: UsersService,
        private actions$:Actions
    ){}
}