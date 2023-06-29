import { left, right } from "@/modules/@shared/logic";
import { GenerateMercadopagoPaymentUsecaseInterface } from "../../../../domain/usecases/mercadopago-actions"
import { OrderFacadeInterface } from "@/modules/checkout/order/facades";
import { OrderNotFoundError, PaymentAlreadyCreatedError } from "./errors";
import { OrderPaymentFacadeInterface } from "@/modules/checkout/payment/order-payment/facades";
import { MercadopagoGatewayInterface } from "../../../../domain/gateways";


export class GenerateMercadopagoPaymentUsecase implements GenerateMercadopagoPaymentUsecaseInterface {

    constructor(
        private readonly orderFacade: OrderFacadeInterface,
        private readonly orderPaymentFacade: OrderPaymentFacadeInterface,
        private readonly mercadopagoGateway: MercadopagoGatewayInterface,
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
            orderPaymentId: orderDetails.orderPaymentId,
            customer: {
                email: orderDetails.customer.email
            }
        })

        // Return right-side data if no errors occurred
        return right({
            ...mercadopagoPayment.data
        })
    }
}
