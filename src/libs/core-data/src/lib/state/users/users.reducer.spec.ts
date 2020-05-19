import { UsersActions, UsersLoaded, UserCreated, UserDeleted, UserUpdated } from './users.actions';
import { UsersState, usersReducers, initialState } from './users.reducer';
import { IUser, Role } from '@workspace/interfaces';
describe("users reducer",()=>{
    let someUsers: IUser[];
    let someInitState: UsersState;
    beforeEach(()=>{
        someUsers = [
            {
                _id:"someId",
                firstName:"someFirstName",
                lastName:"someLastName",
                role:Role.ADMIN,
                username:"someusername",
                password:"somepassword"
            },
            {
                _id:"someOtherId",
                firstName:"someFirstName",
                lastName:"someLastName",
                role:Role.ADMIN,
                username:"someusername",
                password:"somepassword"
            }
        ];
        someInitState = {
            ids:someUsers.map(u=>u._id),
            entities:someUsers.reduce((obj,u)=>{
                obj[u._id]=u;
                return obj;
            },{})
        }
    })
    describe("default",()=>{
        it("should return init state",()=>{
            const someAction = {
                type:"someAction",
                payload:{
                    
                },
            };
            const expected = initialState;
            const result = usersReducers(undefined,someAction as UsersActions);
            expect(result).toBe(initialState);
        });
    });
    describe("Users Loaded",()=>{
        it("should return a list of users",()=>{
            const usersLoaded = new UsersLoaded(someUsers);
            const result = usersReducers(undefined,usersLoaded);
            expect(result.ids).toEqual(someUsers.map(u=>u._id));
        });
    });
    describe("User Created",()=>{
        it("should add the created user",()=>{
            const someUser = someUsers[0];
            const userCreated = new UserCreated(someUser);
            const result = usersReducers(undefined,userCreated);
            expect(result.entities).toHaveProperty(someUser._id);
        });
    });
    describe("User Deleted",()=>{
        it("should delete the passed user",()=>{
            const someUser = someUsers[0];
            const userDeleted = new UserDeleted(someUser);
            const result = usersReducers(someInitState,userDeleted);
            expect(result.entities).not.toHaveProperty(someUser._id);
        });
    });
    describe("User Updated",()=>{
        it("should update the passed user",()=>{
            const someUser = someUsers[0];
            const someUpdate = {...someUser,username:"newUsername"};
            const userUpdated = new UserUpdated(someUpdate);
            const result = usersReducers(someInitState,userUpdated);
            expect(result.entities[someUser._id]).toEqual(someUpdate);
        });
    });
});