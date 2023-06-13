import { Either } from "@/modules/@shared/logic";

export interface StockNormalManualFacadeInterface {

    decreaseQuantity(stockItemId: string, quantity: number): Promise<Either<Error[], {
        stockINormalManualId: string
        quantity: number
    }>>
}