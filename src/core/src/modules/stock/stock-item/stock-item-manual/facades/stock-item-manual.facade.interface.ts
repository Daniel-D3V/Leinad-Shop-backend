import { Either } from "@/modules/@shared/logic";

export interface StockItemManualFacadeInterface {

    decreaseQuantity(stockItemId: string, quantity: number): Promise<Either<Error[], {
        stockItemManualId: string
        quantity: number
    }>>
}