import { OrderPaymentRepositoryInterface } from "../../domain/repositories";
import { OrderPaymentFacadeInterface } from "../../facades";


export class OrderPaymentFacadeImp implements OrderPaymentFacadeInterface {
    
    constructor(
        private readonly orderPaymentRepository: OrderPaymentRepositoryInterface
    ){}
    
    async hasPaymentCreated(orderId: string): Promise<boolean> {
        const orderPaymentEntity = await this.orderPaymentRepository.findByOrderId(orderId)
        return !!orderPaymentEntity?.hasPaymentProvider() 
    }

    async getOrderPaymentDetailsById(orderPaymentId: string): Promise<OrderPaymentFacadeInterface.OrderPaymentDetailsModel | null> {
        const orderPaymentEntity = await this.orderPaymentRepository.findById(orderPaymentId)
        if(!orderPaymentEntity) return null
        return {
            orderPaymentProviderId: orderPaymentEntity.paymentProviderId,
            orderPaymentId: orderPaymentEntity.id,
            orderPaymentCustomer: orderPaymentEntity.orderPaymentCustomer.toJSON()
        }
    }

    async getOrderPaymentDetails(orderId: string): Promise<OrderPaymentFacadeInterface.OrderPaymentDetailsModel | null> {
        const orderPaymentEntity = await this.orderPaymentRepository.findByOrderId(orderId)
        if(!orderPaymentEntity) return null
        return {
            orderPaymentProviderId: orderPaymentEntity.paymentProviderId,
            orderPaymentId: orderPaymentEntity.id,
            orderPaymentCustomer: orderPaymentEntity.orderPaymentCustomer.toJSON()
        }
    }


}