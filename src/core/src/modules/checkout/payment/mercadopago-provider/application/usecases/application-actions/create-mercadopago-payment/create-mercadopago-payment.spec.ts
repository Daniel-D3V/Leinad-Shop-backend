import { EventEmitterInterface } from "@/modules/@shared/events";
import { MercadopagoGatewayInterface } from "../../../../domain/gateways";
import { MercadopagoPaymentProviderRepositoryInterface } from "../../../../domain/repositories";
import { CreateMercadopagoPaymentUsecaseInterface } from "../../../../domain/usecases/application-actions";
import { CreateMercadopagoPaymentUsecase } from "./create-mercadopago-payment.usecase";
import { MercadopagoPaymentProviderEntity } from "../../../../domain/entities";
import { mock } from "jest-mock-extended";
import { MercadopagoPaymentCreatedEvent } from "./mercadopago-payment-created.event";

jest.mock("./mercadopago-payment-created.event")

describe("CreateMercadoPagoPayment", () => {

    let sut: CreateMercadopagoPaymentUsecase;
    let props: CreateMercadopagoPaymentUsecaseInterface.InputDto
    let mercadopagoPaymentProviderRepository: MercadopagoPaymentProviderRepositoryInterface
    let mercadopagoGateway: MercadopagoGatewayInterface
    let eventEmitter: EventEmitterInterface
    let mercadopagoPaymentProviderEntity: MercadopagoPaymentProviderEntity

    beforeEach(() => {

        props = {
            mercadopagoPaymentId: "any_mercadopago_payment_id"
        }
        mercadopagoPaymentProviderEntity = mock<MercadopagoPaymentProviderEntity>()
        jest.spyOn(MercadopagoPaymentProviderEntity, "create")
        .mockReturnValue(mercadopagoPaymentProviderEntity)

        mercadopagoPaymentProviderRepository = mock<MercadopagoPaymentProviderRepositoryInterface>()
        mercadopagoGateway = mock<MercadopagoGatewayInterface>({
            findById: jest.fn().mockResolvedValue({})
        })
        eventEmitter = mock<EventEmitterInterface>()
        sut = new CreateMercadopagoPaymentUsecase(
            mercadopagoPaymentProviderRepository,
            mercadopagoGateway,
            eventEmitter
        )
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return MercadopagoPaymentNotFoundError if mercadopagoGateway.findById returns null", async () => {
        jest.spyOn(mercadopagoGateway, "findById")
        .mockResolvedValueOnce(null)
        const output = await sut.execute(props)
        if(output.isRight()) throw new Error("Should not return right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("MercadopagoPaymentNotFoundError")
    })

    it("Should return MercadopagoPaymentProviderAlreadyCreatedError if mercadopagoPaymentProviderRepository.findByMercadopagoPaymentId returns a value", async () => {
        jest.spyOn(mercadopagoPaymentProviderRepository, "findByMercadopagoPaymentId")
        .mockResolvedValueOnce(mercadopagoPaymentProviderEntity)
        const output = await sut.execute(props)
        if(output.isRight()) throw new Error("Should not return right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("MercadopagoPaymentProviderAlreadyCreatedError")
    })

    it("Should call mercadopagoPaymentProviderRepository.create with the right params", async () => {
        await sut.execute(props)
        expect(mercadopagoPaymentProviderRepository.create).toBeCalledWith(mercadopagoPaymentProviderEntity)
        expect(mercadopagoPaymentProviderRepository.create).toBeCalledTimes(1)
    })

    it("Should call eventEmitter.emit once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toBeCalledTimes(1)
    })

    it("Should create MercadopagoPaymentCreatedEvent with the right params", async () => {
        await sut.execute(props)
        expect(MercadopagoPaymentCreatedEvent).toHaveBeenCalledWith({
            ...mercadopagoPaymentProviderEntity.toJSON()
        })
    })
})