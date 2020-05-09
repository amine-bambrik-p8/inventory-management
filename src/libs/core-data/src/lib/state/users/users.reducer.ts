import { UsersActions, UsersActionTypes } from './users.actions';
import { IUser } from '@workspace/interfaces';
import { EntityAdapter,EntityState,createEntityAdapter } from '@ngrx/entity';

export interface UsersState extends EntityState<IUser>{
    
}

const adapter: EntityAdapter<IUser> = createEntityAdapter<IUser>({
    selectId: (user: IUser)=> user._id
});

export const initialState: UsersState =  adapter.getInitialState({
    
});

export function usersReducers(state = initialState,action:UsersActions): UsersState{
    switch (action.type) {
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

const { selectIds , selectAll , selectEntities , selectTotal } = adapter.getSelectors();

export const selectUsersIds = selectIds;
export const selectAllUsers = selectAll;
export const selectUsersEntities = selectEntities;
export const selectUsersTotal = selectTotal;