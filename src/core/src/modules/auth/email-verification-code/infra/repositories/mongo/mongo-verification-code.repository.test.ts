import { MongoMemoryReplSet } from 'mongodb-memory-server';
import mongoose from "mongoose"
import { MongoVerificationCodeModel } from "./models";
import { MongoVerificationCodeRepository } from './mongo-verification-code.repository';
import { VerificationCodeEntity } from '../../../domain/entities';
import { mock } from 'jest-mock-extended';

describe("Test MongoRefreshTokenRepository", () => {

    let mongoServer: MongoMemoryReplSet
    let sut: MongoVerificationCodeRepository
    let verificationCodeEntity: VerificationCodeEntity

    beforeEach(async () => {
        const expirationDate = new Date()
        expirationDate.setHours(expirationDate.getHours() + 1)
        verificationCodeEntity = mock<VerificationCodeEntity>({
            id: "any_id",
            code: "any_code",
            userId: "any_user_id",
            toJSON: () => ({
                id: "any_id",
                code: "any_code",
                userId: "any_user_id",
                expirationDate
            })
        })
        sut = new MongoVerificationCodeRepository()
        await MongoVerificationCodeModel.deleteMany({})
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

    it("Should create a verification code", async () => {
        await sut.create(verificationCodeEntity)

        const createdVerificationCode = await sut.findByCode(verificationCodeEntity.code)
        expect(createdVerificationCode?.toJSON()).toEqual(verificationCodeEntity.toJSON())
    })

    it("Should find a verification code by code", async () => {
        await sut.create(verificationCodeEntity)

        const verificationCodeFound = await sut.findByCode(verificationCodeEntity.code)
        expect(verificationCodeFound?.toJSON()).toEqual(verificationCodeEntity.toJSON())
    })

    it("Should return null if verification code not found by code", async () => {
        const verificationCodeFound = await sut.findByCode(verificationCodeEntity.code)
        expect(verificationCodeFound).toBeNull()
    })

    it("Should find a verification code by userId", async () => {
        await sut.create(verificationCodeEntity)

        const verificationCodeFound = await sut.findByUserId(verificationCodeEntity.userId)
        expect(verificationCodeFound?.toJSON()).toEqual(verificationCodeEntity.toJSON())
    })

    it("Should return null if verification code not found by userId", async () => {
        const verificationCodeFound = await sut.findByUserId(verificationCodeEntity.userId)
        expect(verificationCodeFound).toBeNull()
    })

    it("Should delete a verification code by code", async () => {
        await sut.create(verificationCodeEntity)

        await sut.deleteByCode(verificationCodeEntity.code)

        const verificationCodeFound = await sut.findByCode(verificationCodeEntity.code)
        expect(verificationCodeFound).toBeNull()
    })
})