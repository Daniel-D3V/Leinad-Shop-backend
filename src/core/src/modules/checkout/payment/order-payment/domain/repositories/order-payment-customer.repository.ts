import { OrderPaymentCustomerEntity } from "../entities";

export interface OrderPaymentCustomerRepositoryInterface {
    findById(id: string): Promise<OrderPaymentCustomerEntity | null>
}