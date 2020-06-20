import { ClientsActions, LoadClients, ClientsLoaded, ClientCreated, ClientDeleted, ClientUpdated } from './clients.actions';
import { clientsReducers, initialState, ClientsState } from "./clients.reducer";
import { IClient } from '@workspace/interfaces';

describe("clients reducer",()=>{
    let someClients:IClient[];
    let someInitState:ClientsState;
    beforeEach(()=>{
        someClients = [
            {
                _id:"someID",
                email:"someEmail",
                address:{
                    address:"someAddress",
                    city:"someCity",
                    zip:"1256",
                },
                firstName:"someFirstName",
                lastName:"someLastName",
                phoneNumber:"somePhoneNumber",
                picture:"someurl",
                dateOfSubscription:new Date(),
            },
            {
                _id:"someOtherID",
                email:"someEmail",
                address:{
                    address:"someAddress",
                    city:"someCity",
                    zip:"1256",
                },
                firstName:"someFirstName",
                lastName:"someLastName",
                phoneNumber:"somePhoneNumber",
                picture:"someurl",
                dateOfSubscription:new Date(),
            },
            
        ];
        someInitState = {
            ids:someClients.map((c)=>c._id),
            entities:someClients.reduce((obj,c)=>{
                obj[c._id]=c;
                return obj;
            },{}),
            selectedClient:null
        }
    })
    describe("default",()=>{
        it("should return init state",()=>{
            const someAction = {
                type:"something",
                payload:"Nothing",
            };
            const expected = initialState;
            const result = clientsReducers(undefined,someAction as ClientsActions);
            expect(result).toBe(initialState);
        });
    });
    describe("Load Clients",()=>{
        it("should return a list of clients",()=>{
            
            const loadClients = new ClientsLoaded(someClients);
            const result = clientsReducers(undefined,loadClients);
            expect(result.ids).toEqual(someClients.map((c)=>c._id));
        });
    });
    describe("Client Created",()=>{
        it("should add the created client",()=>{
            const someClient: IClient = someClients[0];
            const clientCreated = new ClientCreated(someClient);
            const result = clientsReducers(undefined,clientCreated);
            expect(result.entities).toHaveProperty(someClient._id);
        });
    });
    describe("Client Deleted",()=>{
        it("should delete the passed client",()=>{
            const someClient: IClient = someClients[0];
            const clientDeleted = new ClientDeleted(someClient);
            const result = clientsReducers(someInitState,clientDeleted);
            expect(result.entities).not.toHaveProperty(someClient._id);
        });
    });
    describe("Client Updated",()=>{
        it("should update the passed client",()=>{
            const someClient: IClient = someClients[0];
            const someUpdate = {...someClient,firstName:"someOtherFirstName"};
            const clientUpdated = new ClientUpdated(someUpdate);
            const result = clientsReducers(someInitState,clientUpdated);
            expect(result.entities[someClient._id]).toEqual(someUpdate);
        });
    });
});