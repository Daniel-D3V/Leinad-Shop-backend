import { PaymentEntity } from "../../../domain/entities"

export type GeneratePaymentInputDto = {
    orderId: string
    paymentMethod: PaymentEntity.PaymentMethod
    customerId: string 
    amount: number
}