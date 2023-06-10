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

    it("Should be initialize ChatDelivery", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should return left if the chatDeliveryEntity is invalid", async () => {
        chatDeliveryEntity.create.mockReturnValueOnce({
            isLeft: () => true,
            value: [new Error("EntityError")]
        } as any)

        const output = await sut.execute(props)
        if (output.isRight()) throw new Error("usecase should not return right")

        expect(output.isLeft()).toBe(true)
        expect(output.value[0]).toEqual(new Error("EntityError"))
    })


    it("Should return ChatDeliveryAlreadyCreatedError if chatDeliveryRepository finds a chat using a orderId", async () => {
        jest.spyOn(chatDeliveryRepository, "findByOrderId").mockResolvedValueOnce(true as any);

        const output = await sut.execute(props)
        if (output.isRight()) return fail("It should not be right")

        expect(output.value[0].name).toBe("ChatDeliveryAlreadyCreatedError")
    })
})