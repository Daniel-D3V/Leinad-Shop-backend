import { AnnounceItemEntity } from "./announce-item.entity"


describe("Test AnnounceItem", () => {

    let sut: AnnounceItemEntity
    let props: AnnounceItemEntity.Input
    let id: string

    beforeEach(() => {
        
        jest.spyOn(AnnounceItemEntity, "validateAnnounceItemProps")
        .mockReturnValue({ isLeft: () => false } as any )
        id = "any_id"
        props = {
            announceId: "any_announce_id",
            price: 100,
            title: "any_title"
        }

        sut = AnnounceItemEntity.create(props, id).value as AnnounceItemEntity
    })

    it("should create announce item", () => {
        expect(sut).toBeInstanceOf(AnnounceItemEntity)
        expect(sut.toJSON()).toEqual({
            id,
            ...props
        })
    })

    it("Should return an error if props is invalid", () => {
        const propsError = new Error("props error")
        jest.spyOn(AnnounceItemEntity, "validateAnnounceItemProps")
        .mockReturnValue({ isLeft: () => true, value: [propsError] } as any )

        const result = AnnounceItemEntity.create(props, id)
        expect(result.isLeft()).toBe(true)
        expect(result.value).toEqual([propsError])
    })

    it("Should change title", () => {
        const newTitle = "new_title"
        const result = sut.changeTitle(newTitle)
        expect(result.isRight()).toBe(true)
        expect(sut.title).toBe(newTitle)
    })

    it("Should return an error if title is invalid", () => {
        const newTitle = "new_title"
        const propsError = new Error("props error")
        jest.spyOn(AnnounceItemEntity, "validateAnnounceItemProps")
        .mockReturnValue({ isLeft: () => true, value: [propsError] } as any )

        const result = sut.changeTitle(newTitle)
        expect(result.isLeft()).toBe(true)
        expect(result.value).toEqual([propsError])
    })
})