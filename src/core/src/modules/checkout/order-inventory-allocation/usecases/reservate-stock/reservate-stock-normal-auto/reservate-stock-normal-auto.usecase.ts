import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import {  StockNormalManualReservationRepositoryInterface } from "../../../domain/repositories";
import { randomUUID } from "crypto";
import { NoStockItemAutoAvailableError } from "./errors";
import { StockNormalManualFacadeInterface } from "@/modules/stock/stock-normal/stock-normal-manual/facades";

export class ReservateStockNormalAutoUsecase implements UsecaseInterface {

    constructor(
        private readonly stockNormalManualReservationRepositoryInterface: StockNormalManualReservationRepositoryInterface,
        private readonly stockNormalManualFacadeInterface: StockNormalManualFacadeInterface
    ){}

    async execute({ orderItemId, orderId, stockItemId, quantity }: ReservateStockItemAutoUsecase.InputDto): Promise<Either<Error[], null>> {
        
        const stockNormalManual = await this.stockNormalManualFacadeInterface.decreaseQuantity(stockItemId, quantity)
        if(stockNormalManual.isLeft()) return left([ new NoStockItemAutoAvailableError() ])

        await this.stockNormalManualReservationRepositoryInterface.create({
            id: randomUUID(),
            stockNormalManualId: stockNormalManual.value.stockINormalManualId,
            quantity: stockNormalManual.value.quantity,
            orderId,
            orderItemId,
        })

        return right(null)
    }
}

export namespace ReservateStockItemAutoUsecase {

    export type InputDto = {
        stockItemId: string
        quantity: number
        orderItemId: string
        orderId: string
    }
    
}