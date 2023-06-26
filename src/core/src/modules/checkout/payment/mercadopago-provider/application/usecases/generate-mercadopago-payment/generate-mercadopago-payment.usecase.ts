import { left, right } from "@/modules/@shared/logic";
import { GenerateMercadoPagoPaymentUsecaseInterface } from "../../../domain/usecases";
import { MercadopagoPaymentProviderEntity } from "../../../domain/entities";
import { OrderFacadeInterface } from "@/modules/checkout/order/facades";
import { OrderNotFoundError, PaymentAlreadyCreatedError } from "./errors";
import { OrderPaymentFacadeInterface } from "@/modules/checkout/payment/order-payment/facades";
import { MercadopagoPaymentProviderRepositoryInterface } from "../../../domain/repositories";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { MercadopagoGatewayInterface } from "../../../domain/gateways";
import { MercadopagoPaymentGeneratedEvent } from "./mercadopago-payment-generated.event";



export class GenerateMercadopagoPaymentUsecase implements GenerateMercadoPagoPaymentUsecaseInterface {

    constructor(
        private readonly orderFacade: OrderFacadeInterface,
        private readonly orderPaymentFacade: OrderPaymentFacadeInterface,
        private readonly mercadopagoGateway: MercadopagoGatewayInterface,
        private readonly mercadopagoPaymentProviderRepository: MercadopagoPaymentProviderRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ orderId, email }: GenerateMercadoPagoPaymentUsecaseInterface.InputDto): Promise<GenerateMercadoPagoPaymentUsecaseInterface.OutputDto> {
        
        const paymentAlreadyCreated = await this.orderPaymentFacade.hasPaymentCreated(orderId)
        if(paymentAlreadyCreated) return left([ new PaymentAlreadyCreatedError() ])

        const orderDetails = await this.orderFacade.consultOrderDetails(orderId)
        if(!orderDetails) return left([ new OrderNotFoundError() ])

        const mercadopagoPayment = await this.mercadopagoGateway.generatePayment({
            amount: orderDetails.totalAmount,
            email
        })
        
        const mercadopagoPaymentProviderEntity = MercadopagoPaymentProviderEntity.create({
            amount: orderDetails.totalAmount,
            orderPaymentId: orderDetails.orderPaymentId,
            mercadopagoPaymentId: mercadopagoPayment.paymentId,
        })
        await this.mercadopagoPaymentProviderRepository.create(mercadopagoPaymentProviderEntity)

        const mercadopagoPaymentGeneratedEvent = new MercadopagoPaymentGeneratedEvent({
            ...mercadopagoPaymentProviderEntity.toJSON()
        })
        await this.eventEmitter.emit(mercadopagoPaymentGeneratedEvent)

        return right({
            id: mercadopagoPaymentProviderEntity.id
        })
    }
}