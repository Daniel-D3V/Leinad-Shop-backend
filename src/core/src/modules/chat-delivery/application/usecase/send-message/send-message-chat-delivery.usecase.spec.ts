import { EventEmitterInterface } from "@/modules/@shared/events"
import { ChatDeliveryMessageEntity } from "@/modules/chat-delivery/domain/entities"
import { ChatDeliveryMessageRepositoryInterface } from "@/modules/chat-delivery/domain/repositories/chat-delivery-message.repository.interface"
import { SendMessageChatDeliveryUsecaseInterface } from "@/modules/chat-delivery/domain/usecases/send-message-chat-delivery-usecase.interface"
import { SendMessageChatDeliveryUsecase } from "./send-message-chat-delivery.usecase"

describe("Test SendMessageChatDeliveryUsecase", () => {

    let props: SendMessageChatDeliveryUsecaseInterface.InputDto
    let messageChatDeliveryEntity: jest.Mocked<typeof ChatDeliveryMessageEntity>
    let messageChatDeliveryRepository: ChatDeliveryMessageRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let sut: SendMessageChatDeliveryUsecase

    it("Should be sent messageChatDelivery", () => {
        
    })
})