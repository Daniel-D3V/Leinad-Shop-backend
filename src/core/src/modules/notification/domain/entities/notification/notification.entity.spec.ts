import { NotificationEntity } from "./notification.entity"


describe("Test NotificationEntity", () => {

    let sut: NotificationEntity
    let props: NotificationEntity.Input
    let id: string

    beforeEach(() => {

        id = "any_id"
        props = {
            content: "any_content",
            topic: "any_topic",
            userId: "any_user_id",
            dateTimeSent: new Date()
        }
        sut = NotificationEntity.create(props, id)
    })

    it("should create a NotificationEntity", () => {
        expect(sut).toBeDefined()
        expect(sut).toBeInstanceOf(NotificationEntity)
        expect(sut.toJSON()).toEqual({
            id,
            ...props,
            hasBeenSeen: false
        })
    })

    it("should view a NotificationEntity", () => {
        sut.view()
        expect(sut.hasBeenSeen()).toBeTruthy()
    })

    it("Should create a NotificationEntity with default dateTimeSent if dateTimeSent is not provided", () => {
        delete props.dateTimeSent
        const sut = NotificationEntity.create({
            ...props
        })
        expect(sut.dateTimeSent).toBeInstanceOf(Date)
    })

})