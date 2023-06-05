import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface UpdateStockItemManualUsecaseInterface extends UsecaseInterface {
    execute(input: UpdateStockItemManualUsecaseInterface.InputDto): Promise<UpdateStockItemManualUsecaseInterface.OutputDto>
}

export namespace UpdateStockItemManualUsecaseInterface {
    export type InputDto = {
        stockItemManualId: string
        stock: number
    }

    export type OutputDto = Either<Error[], null>
}