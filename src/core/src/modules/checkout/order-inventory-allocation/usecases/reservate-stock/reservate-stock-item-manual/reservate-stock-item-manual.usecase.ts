import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { StockItemManualReservationRepositoryInterface } from "../../../repositories";
import { randomUUID } from "crypto";
import { StockItemManualFacadeInterface } from "@/modules/stock/stock-item/stock-item-manual/facades";

export class ReservateStockItemManualUsecase implements UsecaseInterface {

    constructor(
        private readonly stockItemManualReservationRepositoryInterface: StockItemManualReservationRepositoryInterface,
        private readonly stockItemManualFacadeInterface: StockItemManualFacadeInterface
    ){}

    async execute({ orderItemId, orderId, stockItemId, quantity }: ReservateStockItemManualUsecase.InputDto): Promise<Either<Error[], null>> {
        
        const stockItemManual = await this.stockItemManualFacadeInterface.decreaseQuantity(stockItemId, quantity)
        if(stockItemManual.isLeft()) return left(stockItemManual.value)

        await this.stockItemManualReservationRepositoryInterface.create({
            id: randomUUID(),
            stockItemManualId: stockItemManual.value.stockItemManualId,
            quantity:  stockItemManual.value.quantity,
            orderId,
            orderItemId,
        })

        return right(null)
    }
}

export namespace ReservateStockItemManualUsecase {

    export type InputDto = {
        stockItemId: string
        quantity: number
        orderItemId: string
        orderId: string

    }
    
}