
export interface GetProductStockAutoValueFacadeInterface {
    execute(productId: string): Promise<string | undefined>
} 