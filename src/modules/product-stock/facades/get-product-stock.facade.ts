
export interface GetProductStockFacadeInterface {
    execute(productId: string): Promise<number | undefined>
} 