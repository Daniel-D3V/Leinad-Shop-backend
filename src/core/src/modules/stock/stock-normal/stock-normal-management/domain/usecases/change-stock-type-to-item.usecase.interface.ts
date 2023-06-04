import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface ChangeStockTypeToItemUsecaseInterface extends UsecaseInterface {
    execute(input: ChangeStockTypeToItemUsecaseInterface.InputDto): Promise<ChangeStockTypeToItemUsecaseInterface.OutputDto>
}

export namespace ChangeStockTypeToItemUsecaseInterface {
    export type InputDto = {
        stockManagementId: string
    }

    export type OutputDto = Either<Error[], null>
}