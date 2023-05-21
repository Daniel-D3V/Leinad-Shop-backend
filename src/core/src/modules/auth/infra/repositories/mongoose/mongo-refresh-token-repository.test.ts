import { MongoRefreshTokenRepository } from "./mongo-refresh-token.repository"
import {  MongoMemoryReplSet } from 'mongodb-memory-server';
import mongoose from "mongoose"
import { MongoRefreshTokenModel } from "./models";

describe("Test MongoRefreshTokenRepository", () => {

    let mongoServer: MongoMemoryReplSet
    let sut: MongoRefreshTokenRepository
    let token: string

    beforeEach(async () => {
        token = "any_token"
        sut = new MongoRefreshTokenRepository()
        await MongoRefreshTokenModel.deleteMany({})
    })

    beforeAll(async () => {
        mongoServer = await MongoMemoryReplSet.create();
        const mongoUri =  mongoServer.getUri();
        await mongoose.connect(mongoUri);
    })

    afterAll(async () => {
        await mongoose.disconnect()
        await mongoServer.stop();
    })

    it("Should store a refresh token", async () => {
        await sut.storeRefreshToken(token, new Date())
        const refreshToken = await sut.findRefreshToken(token)
        expect(refreshToken).toBe(token)
    })

    it("Should return null if refresh token is not found", async () => {
        const refreshToken = await sut.findRefreshToken(token)
        expect(refreshToken).toBeNull()
    })

    it("Should delete a refresh token", async () => {
        await sut.storeRefreshToken(token, new Date())
        await sut.deleteRefreshToken(token)
        const refreshToken = await sut.findRefreshToken(token)
        expect(refreshToken).toBeNull()
    })
})