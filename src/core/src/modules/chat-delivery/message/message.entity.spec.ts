import { DomainValidator } from "@/modules/@shared/domain/validator"
import { ChatDeliveryMessageEntity } from "./message.entity"
import { MessageValidatorFactory } from "./validator";
import { mockDomainValidator } from "@/modules/@shared/tests";

jest.mock("./validator")

describe("Test ChatDeliveryMessageEntity", () => {
    let sut: ChatDeliveryMessageEntity
    let props: ChatDeliveryMessageEntity.Input
    let domainValidator: DomainValidator<any>

    const makeSut = (props: ChatDeliveryMessageEntity.Input) => {
        const chatDeliveryMessageEntityOrError = ChatDeliveryMessageEntity.create(props)
        if (chatDeliveryMessageEntityOrError.isLeft()) throw chatDeliveryMessageEntityOrError.value[0]

        sut = chatDeliveryMessageEntityOrError.value
        return sut
    }

    beforeEach(() => {

        domainValidator = mockDomainValidator()

        jest.spyOn(MessageValidatorFactory, "create")
            .mockReturnValue(domainValidator)

        props = {
            authorId: "any_author_id",
            chatId: "any_chat_id",
            dateTimeSent: new Date(1685138286)
        }

        sut = makeSut(props)
    })

    it('Should create a ChatDeliveryMessageEntity', () => {
        const sut = ChatDeliveryMessageEntity.create(props, "any_id")

        if (sut.isLeft()) throw sut.value[0];

        expect(sut.value.toJSON()).toEqual({
            id: "any_id",
            authorId: "any_author_id",
            chatId: "any_chat_id",
            dateTimeSent: new Date(1685138286)
        })
    })
})