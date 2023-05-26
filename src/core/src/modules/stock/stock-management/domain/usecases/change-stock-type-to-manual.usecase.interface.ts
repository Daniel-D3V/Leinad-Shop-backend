import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface ChangeStockTypeToManualUsecaseInterface extends UsecaseInterface {
    execute(input: ChangeStockTypeToManualUsecaseInterface.InputDto): Promise<ChangeStockTypeToManualUsecaseInterface.OutputDto>
}

export namespace ChangeStockTypeToManualUsecaseInterface {
    export type InputDto = {
        productStockId: string
    }

    export type OutputDto = Either<Error[], null>
}