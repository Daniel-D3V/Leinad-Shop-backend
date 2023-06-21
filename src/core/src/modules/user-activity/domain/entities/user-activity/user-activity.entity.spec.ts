import { UserActivityEntity } from "./user-activity.entity"


describe("Test UserActivityEntity", () => {

    let sut: UserActivityEntity
    let props: UserActivityEntity.Input
    let id: string

    beforeEach(() => {
        id = "any_id"
        props = {
            userId: "any_user_id"
        }
        sut = UserActivityEntity.create(props, id)
    })

    it("Should cretae a new UserActivityEntity", () => {
        expect(sut).toBeInstanceOf(UserActivityEntity)
        expect(sut.toJSON()).toEqual({ 
            id,
            status: "OFFLINE",
            StatusOptions: "DEFAULT",
            ...props,
        })
    })

    it("Should set user online", () => {
        sut.setStatusOnline()
        expect(sut.isUserOnline()).toBeTruthy()
    })

    it("Should set user offline", () => {
        sut.setStatusOnline()
        expect(sut.isUserOnline()).toBeTruthy()
        sut.setStatusOffline()
        expect(sut.isUserOffline()).toBeTruthy()
    })

    it("Should return true if user is online", () => {
        sut.setStatusOnline()
        expect(sut.isUserOnline()).toBeTruthy()
        expect(sut.status).toBe("ONLINE")
    })

    it("Should return true if user is offline", () => {
        expect(sut.isUserOffline()).toBeTruthy()
        expect(sut.status).toBe("OFFLINE")
    })

    it("Should set option idle", () => {
        sut.setOptionIdle()
        expect(sut.isOptionIdle()).toBeTruthy()
    })

    it("Should set option default", () => {
        sut.setOptionIdle()
        expect(sut.isOptionIdle()).toBeTruthy()
        sut.setOptionDefault()
        expect(sut.isOptionDefault()).toBeTruthy()
    })

    it("Should return true if option is idle", () => {
        sut.setOptionIdle()
        expect(sut.isOptionIdle()).toBeTruthy()
        expect(sut.statusOptions).toBe("IDLE")
    })

    it("Should return true if option is default", () => {
        expect(sut.isOptionDefault()).toBeTruthy()
        expect(sut.statusOptions).toBe("DEFAULT")
    })

    it("Should set last seen if status is set to offline", () => {
        expect(sut.lastSeen()).toBeUndefined()
        sut.setStatusOffline()
        expect(sut.lastSeen()).toBeInstanceOf(Date)
    })

    it("Should return undefined if status is set to online", () => {
        sut.setStatusOnline()
        expect(sut.lastSeen()).toBeUndefined()
    })
})