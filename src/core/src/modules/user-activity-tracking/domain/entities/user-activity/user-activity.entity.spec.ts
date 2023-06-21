import { UserActivityEntity } from "./user-activity.entity"


describe("Test UserActivityEntity", () => {

    let sut: UserActivityEntity
    let props: UserActivityEntity.Props
    let id: string

    beforeEach(() => {
        id = "any_id"
        props = {}
        sut = UserActivityEntity.create(props, id)
    })

    it("Should cretae a new UserActivityEntity", () => {
        expect(sut).toBeInstanceOf(UserActivityEntity)
        expect(sut.toJSON()).toEqual({ 
            id,
        })
    })
})