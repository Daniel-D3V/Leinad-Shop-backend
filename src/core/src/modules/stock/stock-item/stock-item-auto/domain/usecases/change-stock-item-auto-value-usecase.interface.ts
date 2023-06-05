import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface ChangeStockItemAutoValueUsecaseInterface extends UsecaseInterface {
    execute(input: ChangeStockItemAutoValueUsecaseInterface.InputDto): Promise<ChangeStockItemAutoValueUsecaseInterface.OutputDto>
}

export namespace ChangeStockItemAutoValueUsecaseInterface {
    export type InputDto = {
        stockItemAutoId: string
        value: string
    }

    export type OutputDto = Either<Error[], null>
}