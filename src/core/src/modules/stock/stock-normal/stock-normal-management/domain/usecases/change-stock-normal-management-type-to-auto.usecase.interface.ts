import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface ChangeStockNormalManagementTypeToAutoUsecaseInterface extends UsecaseInterface {
    execute(input: ChangeStockNormalManagementTypeToAutoUsecaseInterface.InputDto): Promise<ChangeStockNormalManagementTypeToAutoUsecaseInterface.OutputDto>
}

export namespace ChangeStockNormalManagementTypeToAutoUsecaseInterface {
    export type InputDto = {
        stockNormalManagementId: string
    }

    export type OutputDto = Either<Error[], null>
}