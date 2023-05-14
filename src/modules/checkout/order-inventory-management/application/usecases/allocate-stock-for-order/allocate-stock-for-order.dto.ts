export type allocateStockForOrderInputDto = {
    orderId: string
    products: {
        id: string
        quantity: number
    }[]

}