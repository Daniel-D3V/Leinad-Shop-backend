import { TwoFactorAuthenticationEntity } from "./2fa.entity"

describe("Test TwoFactorAuthenticationEntity", () => {

    let sut: TwoFactorAuthenticationEntity
    let props: TwoFactorAuthenticationEntity.Input
    let id: string

    beforeEach(() => {
        id = "any_id"
        props = {
            secret: "any_secret",
            userId:"any_user_Id",
            isValid: false
        }
        sut = TwoFactorAuthenticationEntity.create(props, id)
    })

    it("Should create TwoFactorAuthenticationEntity", () => {

        expect(sut.toJSON()).toEqual({
            ...props, id
        })
    })

    it("Should validate", () => {
        sut.validate()
        expect(sut.isValid()).toBe(true)
    })

    it("Should check if its valid", () => {
        expect(sut.isValid()).toBe(false)
        sut.validate()
        expect(sut.isValid()).toBe(true)
    })
})