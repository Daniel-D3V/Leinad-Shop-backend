import { EventEmitterInterface } from "@/modules/@shared/events"
import { ChatDeliveryMessageEntity } from "@/modules/chat-delivery/domain/entities"
import { ChatDeliveryMessageRepositoryInterface } from "@/modules/chat-delivery/domain/repositories/chat-delivery-message.repository.interface"
import { SendMessageChatDeliveryUsecaseInterface } from "@/modules/chat-delivery/domain/usecases/send-message-chat-delivery-usecase.interface"
import { SendMessageChatDeliveryUsecase } from "./send-message-chat-delivery.usecase"
import { mock } from "jest-mock-extended"
import { ChatDeliveryMessageSentEvent } from "./chat-delivery-message-sent.event"

jest.mock("./chat-delivery-message-sent.event");


describe("Test SendMessageChatDeliveryUsecase", () => {

    let props: SendMessageChatDeliveryUsecaseInterface.InputDto
    let messageChatDeliveryEntity: ChatDeliveryMessageEntity
    let messageChatDeliveryRepository: ChatDeliveryMessageRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let sut: SendMessageChatDeliveryUsecase

    beforeEach(() => {
        messageChatDeliveryEntity = mock<ChatDeliveryMessageEntity>()
        jest.spyOn(ChatDeliveryMessageEntity, "create").mockReturnValue({
            isLeft: () => false,
            value: messageChatDeliveryEntity
        } as any)

        props = {
            authorId: "any_id",
            chatId: "any_chat_id",
            content: "any_content",
            attachments: []
        }

        messageChatDeliveryRepository = mock<ChatDeliveryMessageRepositoryInterface>()
        eventEmitter = mock<EventEmitterInterface>()
        sut = new SendMessageChatDeliveryUsecase(messageChatDeliveryRepository, eventEmitter)
    })

    it("Should be sent messageChatDelivery", async () => {
        const output = await sut.execute(props);

        expect(output.isRight()).toBe(true);
    })

    it("Should return an error if messageChatDeliveryEntityOrError returns an error on its creation", async () => {
        const entityError = new Error("EntityError");
        jest.spyOn(ChatDeliveryMessageEntity, "create").mockReturnValueOnce({
            isLeft: () => true,
            value: [entityError]
        } as any)

        const output = await sut.execute(props);
        if (output.isRight()) throw new Error("Should not return right");
        expect(output.value![0]).toEqual(entityError)
    })

    it("Should call messageChatDeliveryRepository.create once", async () => {
        await sut.execute(props)
        expect(messageChatDeliveryRepository.create).toHaveBeenCalledTimes(1)
    })

    it("Should call eventEmiiter", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create ChatDeliveryMessageSentEvent with correct values", async () => {
        await sut.execute(props)
        expect(ChatDeliveryMessageSentEvent).toHaveBeenCalledWith({ ...messageChatDeliveryEntity.toJSON() })
    })
})