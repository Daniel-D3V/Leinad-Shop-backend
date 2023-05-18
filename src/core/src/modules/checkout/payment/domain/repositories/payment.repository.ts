import { PaymentEntity } from "../entities";

export interface PaymentRepositoryInterface {
    create(paymentEntity: PaymentEntity): Promise<void>
    findById(id: string): Promise<PaymentEntity | null>
    update(paymentEntity: PaymentEntity): Promise<void>
}