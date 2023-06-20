import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { PrismaTwoFactorAuthenticationRepository } from "./prisma-2fa.repository"
import { TwoFactorAuthenticationEntity } from "../../../domain/entities"
import { mock } from "jest-mock-extended"


describe("Test PrismaTwoFactorAuthenticationRepository", () => {

    let sut: PrismaTwoFactorAuthenticationRepository
    let twoFactorAuthenticationEntity: TwoFactorAuthenticationEntity

    beforeEach(async () => {
        twoFactorAuthenticationEntity = mock<TwoFactorAuthenticationEntity>({
            id: "any_id",
            userId: "any_user_id",
            toJSON: () => ({
                id: "any_id",
                isValid: false,
                secret: "any_secret",
                userId: "any_user_id"
            })
        })
        sut = new PrismaTwoFactorAuthenticationRepository(prismaClient)
        await prismaClient.twofactor.deleteMany()
    })

    it("Should create a new TwoFactorAuthenticationEntity", async () => {
        await sut.create(twoFactorAuthenticationEntity)
        const twoFactor = await prismaClient.twofactor.findFirst({
            where: {
                id: twoFactorAuthenticationEntity.id
            }
        })
        expect(twoFactor).toEqual(twoFactorAuthenticationEntity.toJSON())
    })

    it("Should find a TwoFactorAuthenticationEntity by userId", async () => {
        await sut.create(twoFactorAuthenticationEntity)
        const twoFactor = await sut.findByUserId(twoFactorAuthenticationEntity.userId)
        expect(twoFactor?.toJSON()).toEqual(twoFactorAuthenticationEntity.toJSON())
    })

    it("Should return null if TwoFactorAuthenticationEntity not found", async () => {
        const twoFactor = await sut.findByUserId(twoFactorAuthenticationEntity.userId)
        expect(twoFactor).toBeNull()
    })

    it("Should update a TwoFactorAuthenticationEntity", async () => {
        await sut.create(twoFactorAuthenticationEntity)
        const twoFactor = await sut.findByUserId(twoFactorAuthenticationEntity.userId)
        
        twoFactor?.validate()
        await sut.update(twoFactor!)

        const updatedTwoFactor = await sut.findByUserId(twoFactorAuthenticationEntity.userId)
        expect(updatedTwoFactor?.toJSON()).toEqual(twoFactor?.toJSON())
    })

    it("Should delete a TwoFactorAuthenticationEntity", async () => {
        await sut.create(twoFactorAuthenticationEntity)
        await sut.delete(twoFactorAuthenticationEntity.id)
        const twoFactor = await sut.findByUserId(twoFactorAuthenticationEntity.userId)
        expect(twoFactor).toBeNull()
    })

})