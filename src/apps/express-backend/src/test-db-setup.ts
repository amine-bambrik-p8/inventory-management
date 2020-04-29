import { environment } from './environments/environment';
import * as mongoose from "mongoose";
import {MongoMemoryServer} from "mongodb-memory-server";

export const mongoServer = new MongoMemoryServer();

export async function connect() {
    const uri = await mongoServer.getUri();
    const mongooseOpts = environment.mongoose.options;
    await mongoose.connect(uri,mongooseOpts);
}

export async function closeDatabase() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
}

export async function clearDatabase() {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
}