import { ChatDeliveryMessageAttachmentsEntity } from "./attachments.entity"

describe("Test ChatDeliveryMessageAttachmentsEntity", () => {

    let sut: ChatDeliveryMessageAttachmentsEntity
    let props: ChatDeliveryMessageAttachmentsEntity.Input

    const makeSut = (props: ChatDeliveryMessageAttachmentsEntity.Input) => {
        const chatDeliveryMessageAttachmentsEntityOrError = ChatDeliveryMessageAttachmentsEntity.create(props)
        if (chatDeliveryMessageAttachmentsEntityOrError.isLeft()) throw chatDeliveryMessageAttachmentsEntityOrError.value[0]

        sut = chatDeliveryMessageAttachmentsEntityOrError.value
        return sut
    }

    beforeEach(() => {
        props = {
            attachment: "any_attachment",
            type: "FILE"
        }

        sut = makeSut(props)
    })

    it("Should create a ChatDeliveryMessageAttachmentsEntity", () => {
        const sut = ChatDeliveryMessageAttachmentsEntity.create(props, "any_id");

        if (sut.isLeft()) throw sut.value[0];

        expect(sut.value.toJSON()).toEqual({
            id: "any_id",
            attachment: "any_attachment",
            type: "FILE"
        })
    })
})