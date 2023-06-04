import { EventEmitterInterface } from "@/modules/@shared/events"
import { ChatDeliveryMessageEntity } from "@/modules/chat-delivery/domain/entities"
import { ChatDeliveryMessageRepositoryInterface } from "@/modules/chat-delivery/domain/repositories/chat-delivery-message.repository.interface"
import { SendMessageChatDeliveryUsecaseInterface } from "@/modules/chat-delivery/domain/usecases/send-message-chat-delivery-usecase.interface"
import { SendMessageChatDeliveryUsecase } from "./send-message-chat-delivery.usecase"
import { mock } from "jest-mock-extended"

describe("Test SendMessageChatDeliveryUsecase", () => {

    let props: SendMessageChatDeliveryUsecaseInterface.InputDto
    let messageChatDeliveryEntity: jest.Mocked<typeof ChatDeliveryMessageEntity>
    let messageChatDeliveryRepository: ChatDeliveryMessageRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let sut: SendMessageChatDeliveryUsecase

    beforeEach(() => {
        messageChatDeliveryEntity = messageChatDeliveryEntity as jest.Mocked<typeof ChatDeliveryMessageEntity>
        messageChatDeliveryEntity.create.mockReturnValue({
            isLeft: () => false,
            value: {
                toJSON: () => ({ anyEntityToJSONValue: "any" }),
            }
        } as any)

        props = {
            authorId: "any_id",
            chatId: "any_chat_id",
            content: "any_content",
            attachments: [],
            dateTimeSent: new Date()
        }

        messageChatDeliveryRepository = mock<ChatDeliveryMessageRepositoryInterface>()
        eventEmitter = mock<EventEmitterInterface>()
        sut = new SendMessageChatDeliveryUsecase(messageChatDeliveryRepository, eventEmitter)
    })

    it("Should be sent messageChatDelivery", () => {

    })
})