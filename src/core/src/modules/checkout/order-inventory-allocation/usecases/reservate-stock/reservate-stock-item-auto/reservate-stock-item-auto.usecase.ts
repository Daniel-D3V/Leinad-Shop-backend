import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { StockItemAutoReservationRepositoryInterface } from "../../../domain/repositories";
import { randomUUID } from "crypto";
import { StockItemAutoFacadeInterface } from "@/modules/stock/stock-item/stock-item-auto/facades";
import { NoStockItemAutoAvailableError } from "./errors";

export class ReservateStockItemAutoUsecase implements UsecaseInterface {

    constructor(
        private readonly stockItemAutoReservationRepositoryInterface: StockItemAutoReservationRepositoryInterface,
        private readonly stockItemAutoFacadeInterface: StockItemAutoFacadeInterface
    ){}

    async execute({ orderItemId, orderId, stockItemId }: ReservateStockItemAutoUsecase.InputDto): Promise<Either<Error[], null>> {
        
        const stockItemAuto = await this.stockItemAutoFacadeInterface.pickOneAndDelete(stockItemId)
        if(!stockItemAuto) return left([ new NoStockItemAutoAvailableError() ])

        await this.stockItemAutoReservationRepositoryInterface.create({
            id: randomUUID(),
            stockItemAutoId: stockItemAuto.id,
            value: stockItemAuto.value,
            orderId,
            orderItemId,
        })

        return right(null)
    }
}

export namespace ReservateStockItemAutoUsecase {

    export type InputDto = {
        stockItemId: string
        orderItemId: string
        orderId: string
    }
    
}