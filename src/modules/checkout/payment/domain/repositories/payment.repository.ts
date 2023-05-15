import { PaymentEntity } from "../entities";

export interface PaymentRepositoryInterface {
    create(paymentEntity: PaymentEntity): Promise<void>
}