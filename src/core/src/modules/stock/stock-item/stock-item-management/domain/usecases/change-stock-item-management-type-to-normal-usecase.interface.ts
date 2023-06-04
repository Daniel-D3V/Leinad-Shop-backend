import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface ChangeStockItemManagementTypeToNormalUsecaseInterface extends UsecaseInterface {
    execute(input: ChangeStockItemManagementTypeToNormalUsecaseInterface.InputDto): Promise<ChangeStockItemManagementTypeToNormalUsecaseInterface.OutputDto>
}

export namespace ChangeStockItemManagementTypeToNormalUsecaseInterface {
    export type InputDto = {
        stockItemManagementId: string
    }

    export type OutputDto = Either<Error[], null>
}