import { AnnounceManagementEntity } from "./announce-management.entity"


describe("Test AnnounceManagement", () => {

    let sut: AnnounceManagementEntity
    let props: AnnounceManagementEntity.Input
    let id: string

    beforeEach(() => {
        props = {
            userId: "any_user_id"
        }
        id = "any_id"
        sut = AnnounceManagementEntity.create(props, id).value as AnnounceManagementEntity
    })

    it("should create a new AnnounceManagement", () => {
        expect(sut).toBeInstanceOf(AnnounceManagementEntity)
        expect(sut.toJSON()).toEqual({
            id,
            status: "DEACTIVATED",
            announceType: "NORMAL",
        })
    })

    it("should activate", () => {
        sut.activate()
        expect(sut.isActivated()).toBe(true)
        expect(sut.status).toBe("ACTIVATED")
    })

    it("should ban", () => {
        sut.ban()
        expect(sut.isBanned()).toBe(true)
        expect(sut.status).toBe("BANNED")
    })

    it("should deactivate", () => {
        sut.activate()
        sut.deactivate()
        expect(sut.isDeactivated()).toBe(true)
        expect(sut.status).toBe("DEACTIVATED")
    })

    it("should change type to item", () => {
        sut.changeTypeToItem()
        expect(sut.announceType).toBe("ITEM")
    })

    it("should change type to normal", () => {
        sut.changeTypeToItem()
        sut.changeTypeToNormal()
        expect(sut.announceType).toBe("NORMAL")
    })
    
})