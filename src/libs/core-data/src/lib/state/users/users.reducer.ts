import { UsersActions, UsersActionTypes } from './users.actions';
import { IUser } from '@workspace/interfaces';
import { EntityAdapter,EntityState,createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface UsersState extends EntityState<IUser>{
    selectedUser?:IUser;
}

const adapter: EntityAdapter<IUser> = createEntityAdapter<IUser>({
    selectId: (user: IUser)=> user._id
});

export const initialState: UsersState =  adapter.getInitialState({
});

export function usersReducers(state = initialState,action:UsersActions): UsersState{
    switch (action.type) {
        case UsersActionTypes.USER_READ:
            return {...state,selectedUser:action.payload};
        case UsersActionTypes.USERS_LOADED:
            return adapter.setAll(action.payload,state);
        case UsersActionTypes.USER_CREATED:
            return adapter.addOne(action.payload,state);
        case UsersActionTypes.USER_DELETED:
            return adapter.removeOne(action.payload._id,state);
        case UsersActionTypes.USER_UPDATED:
            const {_id:id,...changes} = action.payload;
            return adapter.updateOne({
                id,
                changes,
            },state);
        default:
            return state;
    }
}

const selectUsersState = createFeatureSelector<UsersState>('users');
const { selectIds , selectAll , selectEntities , selectTotal} = adapter.getSelectors();

export const selectUsersIds = createSelector(selectUsersState,selectIds);
export const selectAllUsers = createSelector(selectUsersState,selectAll);
export const selectUsersEntities = createSelector(selectUsersState,selectEntities);
export const selectUsersTotal = createSelector(selectUsersState,selectTotal);
export const selectedUser = createSelector(selectUsersState,(state:UsersState)=>state.selectedUser);