import { AnnounceInfoEntity } from "./announce-info.entity"


describe("Test AnnounceInfo", () => {

    let sut: AnnounceInfoEntity
    let props: AnnounceInfoEntity.Input
    let id: string

    beforeEach(() => {
        jest.spyOn(AnnounceInfoEntity, "validateProps")
        id = "any_id"
        props = {
            title: "any_title",
            description: "any_description",
            announceId: "any_announce_id"
        }
        sut = AnnounceInfoEntity.create(props, id).value as AnnounceInfoEntity
    })

    it("Should create a announceInfo", () => {
        expect(sut).toBeInstanceOf(AnnounceInfoEntity)
        expect(sut.toJSON()).toEqual({
            id,
            ...props
        })
    })

    it("Should return an error if validateProps returns left", () => {
        const validationError = new Error("validation_error")
        jest.spyOn(AnnounceInfoEntity, "validateProps").mockReturnValueOnce({
            isLeft: () => true,
            value: [ validationError ]
        } as any)
        const result = AnnounceInfoEntity.create(props, id)
        expect(result.isLeft()).toBe(true)
        expect(result.value).toEqual([ validationError ])
    })

    it("Should return an error if changeTitle returns left", () => {
        const validationError = new Error("validation_error")
        jest.spyOn(AnnounceInfoEntity, "validateProps").mockReturnValueOnce({
            isLeft: () => true,
            value: [ validationError ]
        } as any)
        const result = sut.changeTitle("new_title")
        expect(result.isLeft()).toBe(true)
        expect(result.value).toEqual([ validationError ])
    })

    it("Should return an error if changeDescription returns left", () => {
        const validationError = new Error("validation_error")
        jest.spyOn(AnnounceInfoEntity, "validateProps").mockReturnValueOnce({
            isLeft: () => true,
            value: [ validationError ]
        } as any)
        const result = sut.changeDescription("new_description")
        expect(result.isLeft()).toBe(true)
        expect(result.value).toEqual([ validationError ])
    })

    it("Should change the title", () => {
        const result = sut.changeTitle("new_title")
        expect(result.isRight()).toBe(true)
        expect(sut.title).toBe("new_title")
    } )

    it("Should change the description", () => {
        const result = sut.changeDescription("new_description")
        expect(result.isRight()).toBe(true)
        expect(sut.description).toBe("new_description")
    })
})