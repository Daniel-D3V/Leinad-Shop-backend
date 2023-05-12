export type PlaceOrderInputDto = {
    customerId: string
    products: {
        id: string
        quantity: number
    }[]
}

export type PlaceOrderOutputDto = null