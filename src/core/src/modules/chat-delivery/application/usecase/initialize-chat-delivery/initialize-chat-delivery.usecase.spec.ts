import { EventEmitterInterface } from "@/modules/@shared/events";
import { ChatDeliveryEntity } from "@/modules/chat-delivery/domain/entities"
import { ChatDeliveryRepositoryInterface } from "@/modules/chat-delivery/domain/repositories/chat-delivery.repository.interface";
import { InitializeChatDeliveryUsecaseInterface } from "@/modules/chat-delivery/domain/usecases/initilize-chat-delivery-usecase.interface";
import { InitializeChatDeliveryUsecase } from "./initialize-chat-delivery.usecase";
import { mock } from "jest-mock-extended";

jest.mock("@/modules/chat-delivery/domain/entities")

describe("Test InitializeChatDeliveryUsecase", () => {

    let props: InitializeChatDeliveryUsecaseInterface.InputDto;
    let chatDeliveryEntity: jest.Mocked<typeof ChatDeliveryEntity>
    let chatDeliveryRepository: ChatDeliveryRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let sut: InitializeChatDeliveryUsecase

    beforeEach(() => {
        chatDeliveryEntity = ChatDeliveryEntity as jest.Mocked<typeof ChatDeliveryEntity>
        chatDeliveryEntity.create.mockReturnValue({
            isLeft: () => false,
            value: {
                toJSON: () => ({ anyEntityToJSONValue: "any" }),
            }
        } as any)

        props = {
            salesmanId: "any_id",
            customerId: "any_id",
            orderId: "any_id"
        }

        chatDeliveryRepository = mock<ChatDeliveryRepositoryInterface>()
        eventEmitter = mock<EventEmitterInterface>()
        sut = new InitializeChatDeliveryUsecase(chatDeliveryRepository, eventEmitter)
    })

    it("Should be initialize ChatDelivery", () => {

    })
})