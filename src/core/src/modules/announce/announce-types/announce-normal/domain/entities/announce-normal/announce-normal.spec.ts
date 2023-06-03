import { BaseAnnounceEntity } from "@/modules/announce/_base"
import { AnnounceNormalEntity } from "./announce-normal.entity"


describe("Test AnnounceNormal", () => {

    let sut: AnnounceNormalEntity
    let props: AnnounceNormalEntity.Input
    let id: string

    beforeEach(() => {
        jest.spyOn(BaseAnnounceEntity, "validateProps")
        .mockReturnValue({
            isLeft: () => false
        } as any)
        id = "any_id"
        props = {
            price: 10,
            announceId: "any_announce_id"
        }
        sut = AnnounceNormalEntity.create(props, id).value as AnnounceNormalEntity
    })

    it("Should create a valid announceNormal", () => {
        expect(sut).toBeTruthy()
        expect(sut.toJSON()).toEqual({
            id,
            ...props
        })
    })

    it("Should return an error if validator returns an error", () => {
        const validatorError = new Error("validation_error")
        jest.spyOn(BaseAnnounceEntity, "validateProps")
        .mockReturnValue({ isLeft: () => true, value: validatorError } as any)

        const sut = AnnounceNormalEntity.create(props, id)
        if(sut.isRight()) return fail("Should not be right")
        expect(sut.value).toEqual(validatorError)
    })


})