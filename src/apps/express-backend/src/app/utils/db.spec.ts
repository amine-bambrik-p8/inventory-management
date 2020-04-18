import { mongoServer } from './../../test-db-setup';
import * as db from "./db"
import * as mongoose from "mongoose"
describe("db connect function",()=>{
    it("should exist",()=>{
        expect(db.connect).toBeTruthy();
    })
    it("should connect to mongodb",async ()=>{
        const uri = await mongoServer.getUri();
        await db.connect(uri);
        expect(mongoose.connection.readyState).toBe(1);
    })
})