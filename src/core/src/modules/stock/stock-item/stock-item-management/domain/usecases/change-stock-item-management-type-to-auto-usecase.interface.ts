import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface ChangeStockItemManagementTypeToAutoUsecaseInterface extends UsecaseInterface {
    execute(input: ChangeStockItemManagementTypeToAutoUsecaseInterface.InputDto): Promise<ChangeStockItemManagementTypeToAutoUsecaseInterface.OutputDto>
}

export namespace ChangeStockItemManagementTypeToAutoUsecaseInterface {
    export type InputDto = {
        stockItemManagementId: string
    }

    export type OutputDto = Either<Error[], null>
}