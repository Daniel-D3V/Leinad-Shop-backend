import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface ChangeStockItemManagementTypeToManualUsecaseInterface extends UsecaseInterface {
    execute(input: ChangeStockItemManagementTypeToManualUsecaseInterface.InputDto): Promise<ChangeStockItemManagementTypeToManualUsecaseInterface.OutputDto>
}

export namespace ChangeStockItemManagementTypeToManualUsecaseInterface {
    export type InputDto = {
        stockItemManagementId: string
    }

    export type OutputDto = Either<Error[], null>
}