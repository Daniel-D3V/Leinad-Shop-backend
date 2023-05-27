import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface ChangeStockItemPriceUsecaseInterface extends UsecaseInterface {
    execute(input: ChangeStockItemPriceUsecaseInterface.InputDto): Promise<ChangeStockItemPriceUsecaseInterface.OutputDto>
}

export namespace ChangeStockItemPriceUsecaseInterface {
    export type InputDto = {
        stockItemId: string
        price: number
    }

    export type OutputDto = Either<Error[], null>
}