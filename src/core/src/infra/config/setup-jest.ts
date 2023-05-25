// import { beforeAll, afterAll } from "@jest/globals"
// import { MongoMemoryReplSet } from "mongodb-memory-server";
// import mongoose from "mongoose"

// let mongoServer: MongoMemoryReplSet

// beforeAll(async () => {
//     mongoServer = await MongoMemoryReplSet.create();
//     const mongoUri =  mongoServer.getUri();
//     await mongoose.connect(mongoUri);
// })

// afterAll(async () => {
//     console.log("fs")
//     await mongoose.disconnect()
//     await mongoServer.stop();
// })