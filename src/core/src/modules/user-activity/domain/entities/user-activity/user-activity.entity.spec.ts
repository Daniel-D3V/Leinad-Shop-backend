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
        sut.setUserOnline()
        expect(sut.isUserOnline()).toBeTruthy()
    })

    it("Should set user offline", () => {
        sut.setUserOnline()
        expect(sut.isUserOnline()).toBeTruthy()
        sut.setUserOffline()
        expect(sut.isUserOffline()).toBeTruthy()
    })

    it("Should return true if user is online", () => {
        sut.setUserOnline()
        expect(sut.isUserOnline()).toBeTruthy()
        expect(sut.status).toBe("ONLINE")
    })

    it("Should return true if user is offline", () => {
        expect(sut.isUserOffline()).toBeTruthy()
        expect(sut.status).toBe("OFFLINE")
    })
})