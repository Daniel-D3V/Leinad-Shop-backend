import { MongoMemoryReplSet } from 'mongodb-memory-server';
import mongoose from "mongoose"
import { MongoRefreshTokenModel } from "./models";
import { MongoVerificationCodeRepository } from './mongo-verification-code.repository';

describe("Test MongoRefreshTokenRepository", () => {

    let mongoServer: MongoMemoryReplSet
    let sut: MongoVerificationCodeRepository

    beforeEach(async () => {

        sut = new MongoVerificationCodeRepository()
        await MongoRefreshTokenModel.deleteMany({})
    })

    beforeAll(async () => {
        mongoServer = await MongoMemoryReplSet.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri);
    })

    afterAll(async () => {
        await mongoose.disconnect()
        await mongoServer.stop();
    })

    
})