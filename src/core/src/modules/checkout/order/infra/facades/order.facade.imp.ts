import { OrderPaymentFacadeInterface } from "@/modules/checkout/payment/order-payment/facades";
import { OrderRepositoryInterface } from "../../domain/repositories";
import { OrderFacadeInterface } from "../../facades";

export class OrderFacadeImp implements OrderFacadeInterface {
    
    constructor(
        private readonly orderRepository: OrderRepositoryInterface,
        private readonly orderPaymentFacade: OrderPaymentFacadeInterface
    ){}
    
    async consultOrderDetails(orderId: string): Promise<OrderFacadeInterface.OrderDetailsModel | null> {
        const orderEntity = await this.orderRepository.findById(orderId)
        if(!orderEntity) return null

        const orderPaymentDetails = await this.orderPaymentFacade.getOrderPaymentDetails(orderId)
        if(!orderPaymentDetails) return null

        return {
            orderId: orderEntity.id,
            totalPrice: orderEntity.getTotal(),
            totalQuantity: orderEntity.getTotalQuantity(),
            orderPaymentId: orderPaymentDetails.orderPaymentId
        }
    }


}