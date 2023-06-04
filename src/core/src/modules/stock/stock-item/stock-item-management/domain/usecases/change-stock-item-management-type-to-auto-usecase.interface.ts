import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface ChangeStockItemTypeToAutoUsecaseInterface extends UsecaseInterface {
    execute(input: ChangeStockItemTypeToAutoUsecaseInterface.InputDto): Promise<ChangeStockItemTypeToAutoUsecaseInterface.OutputDto>
}

export namespace ChangeStockItemTypeToAutoUsecaseInterface {
    export type InputDto = {
        stockItemId: string
    }

    export type OutputDto = Either<Error[], null>
}