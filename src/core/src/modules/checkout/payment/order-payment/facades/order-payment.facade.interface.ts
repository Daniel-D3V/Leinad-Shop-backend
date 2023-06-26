
export interface OrderPaymentFacadeInterface {

    hasPaymentCreated(orderId: string): Promise<boolean>
}