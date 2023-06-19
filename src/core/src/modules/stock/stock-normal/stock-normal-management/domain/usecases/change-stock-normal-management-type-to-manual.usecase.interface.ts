import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface ChangeStockNormalManagementTypeToManualUsecaseInterface extends UsecaseInterface {
    execute(input: ChangeStockNormalManagementTypeToManualUsecaseInterface.InputDto): Promise<ChangeStockNormalManagementTypeToManualUsecaseInterface.OutputDto>
}

export namespace ChangeStockNormalManagementTypeToManualUsecaseInterface {
    export type InputDto = {
        stockNormalManagementId: string
    }

    export type OutputDto = Either<Error[], null>
}