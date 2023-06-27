import { left, right } from "@/modules/@shared/logic";
import { GenerateMercadopagoPaymentUsecaseInterface } from "../../../domain/usecases";
import { MercadopagoPaymentProviderEntity } from "../../../domain/entities";
import { OrderFacadeInterface } from "@/modules/checkout/order/facades";
import { OrderNotFoundError, PaymentAlreadyCreatedError } from "./errors";
import { OrderPaymentFacadeInterface } from "@/modules/checkout/payment/order-payment/facades";
import { MercadopagoPaymentProviderRepositoryInterface } from "../../../domain/repositories";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { MercadopagoGatewayInterface } from "../../../domain/gateways";
import { MercadopagoPaymentGeneratedEvent } from "./mercadopago-payment-generated.event";


export class GenerateMercadopagoPaymentUsecase implements GenerateMercadopagoPaymentUsecaseInterface {

    constructor(
        private readonly orderFacade: OrderFacadeInterface,
        private readonly orderPaymentFacade: OrderPaymentFacadeInterface,
        private readonly mercadopagoGateway: MercadopagoGatewayInterface,
        private readonly mercadopagoPaymentProviderRepository: MercadopagoPaymentProviderRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ orderId, paymentMethod }: GenerateMercadopagoPaymentUsecaseInterface.InputDto): Promise<GenerateMercadopagoPaymentUsecaseInterface.OutputDto> {
        
        // Check if payment already exists
        const paymentAlreadyCreated = await this.orderPaymentFacade.hasPaymentCreated(orderId)
        if(paymentAlreadyCreated) return left([ new PaymentAlreadyCreatedError() ])

        // Retrieve order details
        const orderDetails = await this.orderFacade.consultOrderDetails(orderId)
        if(!orderDetails) return left([ new OrderNotFoundError() ])
        
        // Generate Mercadopago payment
        const mercadopagoPayment = await this.mercadopagoGateway.generatePayment({
            amount: orderDetails.totalPrice,
            paymentMethod: paymentMethod,
            customer: {
                email: orderDetails.customer.email
            }
        })
        
        // Create payment provider entity
        const mercadopagoPaymentProviderEntity = MercadopagoPaymentProviderEntity.create({
            amount: orderDetails.totalPrice,
            orderPaymentId: orderDetails.orderPaymentId,
            mercadopagoPaymentId: mercadopagoPayment.paymentId,
            paymentMethod: paymentMethod
        })
        await this.mercadopagoPaymentProviderRepository.create(mercadopagoPaymentProviderEntity)

        // Emit payment generated event
        const mercadopagoPaymentGeneratedEvent = new MercadopagoPaymentGeneratedEvent({
            ...mercadopagoPaymentProviderEntity.toJSON()
        })
        await this.eventEmitter.emit(mercadopagoPaymentGeneratedEvent)

        // Return right-side data if no errors occurred
        return right({
            id: mercadopagoPaymentProviderEntity.id
        })
    }
}
