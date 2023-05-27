import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface ChangeStockItemTypeToNormalUsecaseInterface extends UsecaseInterface {
    execute(input: ChangeStockItemTypeToNormalUsecaseInterface.InputDto): Promise<ChangeStockItemTypeToNormalUsecaseInterface.OutputDto>
}

export namespace ChangeStockItemTypeToNormalUsecaseInterface {
    export type InputDto = {
        stockItemId: string
    }

    export type OutputDto = Either<Error[], null>
}