
export interface OrderFacadeInterface {
    consultOrderDetails(orderId: string): Promise<OrderFacadeInterface.OrderDetailsModel | null>
}

export namespace OrderFacadeInterface {
    export type OrderDetailsModel = {
        orderId: string
        totalPrice: number
        totalQuantity: number
        orderPaymentId: string
        customer: {
            id: string
            name: string
            email: string
        }
    }
}