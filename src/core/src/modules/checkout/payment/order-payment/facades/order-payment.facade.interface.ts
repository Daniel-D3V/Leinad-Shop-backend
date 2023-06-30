
export interface OrderPaymentFacadeInterface {

    hasPaymentCreated(orderId: string): Promise<boolean>
    getOrderPaymentDetailsById(orderPaymentId: string): Promise<OrderPaymentFacadeInterface.OrderPaymentDetailsModel  | null>
    getOrderPaymentDetails(orderId: string): Promise<OrderPaymentFacadeInterface.OrderPaymentDetailsModel | null>
}

export namespace OrderPaymentFacadeInterface {

    export type OrderPaymentDetailsModel = {
        orderPaymentId: string
        orderPaymentProviderId?: string
        orderPaymentCustomer: {
            id: string
            name: string
            email: string
        }
    }
}