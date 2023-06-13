import { EventEmitterInterface } from "@/modules/@shared/events";
import { ChatDeliveryEntity } from "@/modules/chat-delivery/domain/entities";
import { ChatDeliveryRepositoryInterface } from "@/modules/chat-delivery/domain/repositories";
import { DeliverChatDeliveryUsecaseInterface } from "@/modules/chat-delivery/domain/usecases/deliver-chat-delivery.usecase.interface"
import { mock } from "jest-mock-extended";
import { DeliverChatDeliveryUsecase } from "./deliver-chat-delivery.usecase";
import { ChatDeliveryDeliveredEvent } from "./chat-delivery-delivered.event";

jest.mock("./chat-delivery-delivered.event")

describe("Test DeliverChatDeliveryUsecase", () => {
    let props: DeliverChatDeliveryUsecaseInterface.InputDto;
    let chatDeliveryEntity: ChatDeliveryEntity
    let chatDeliveryRepository: ChatDeliveryRepositoryInterface;
    let eventEmitter: EventEmitterInterface
    let sut: DeliverChatDeliveryUsecase

    beforeEach(() => {
        chatDeliveryEntity = mock<ChatDeliveryEntity>()

        props = {
            chatDeliveryId: "any_id"
        }

        chatDeliveryRepository = mock<ChatDeliveryRepositoryInterface>({
            findById: async () => chatDeliveryEntity
        })

        eventEmitter = mock<EventEmitterInterface>()
        sut = new DeliverChatDeliveryUsecase(chatDeliveryRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should be return ChatDeliveryNotFoundError if ChatDeliveryEntity is not found", async () => {
        jest.spyOn(chatDeliveryRepository, "findById").mockResolvedValueOnce(null);

        const output = await sut.execute(props);
        if (output.isRight()) return fail("It should not be alright");

        expect(output.value[0].name).toBe("ChatDeliveryNotFoundError")
    })

    it("Should call chatDeliveryEntity.deliver once", async () => {
        await sut.execute(props);

        expect(chatDeliveryEntity.deliver).toHaveBeenCalledTimes(1);
    })

    it("Should call chatDeliveryRepository.update once", async () => {
        await sut.execute(props);

        expect(chatDeliveryRepository.update).toHaveBeenCalledTimes(1);
    })

    it("Should call eventEmitter.emit once", async () => {
        await sut.execute(props);

        expect(eventEmitter.emit).toHaveBeenCalledTimes(1);
    })

    it("Should create chatDeliveryDeliveredEvent with correct values", async () => {
        await sut.execute(props);

        expect(ChatDeliveryDeliveredEvent).toHaveBeenCalledTimes(1);
    })
})