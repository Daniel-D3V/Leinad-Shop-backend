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
    async getOrderPaymentDetails(orderId: string): Promise<OrderPaymentFacadeInterface.OrderPaymentDetailsModel | null> {
        const orderPaymentEntity = await this.orderPaymentRepository.findByOrderId(orderId)
        if(!orderPaymentEntity) return null
        return {
            orderPaymentId: orderPaymentEntity.id,
            orderPaymentCustomer: orderPaymentEntity.orderPaymentCustomer.toJSON()
        }
    }


}