
export interface OrderPaymentFacadeInterface {

    hasPaymentCreated(orderId: string): Promise<boolean>
    getOrderPaymentDetails(orderId: string): Promise<OrderPaymentFacadeInterface.OrderPaymentDetailsModel | null>
}

export namespace OrderPaymentFacadeInterface {

    export type OrderPaymentDetailsModel = {
        orderPaymentId: string
    }
}