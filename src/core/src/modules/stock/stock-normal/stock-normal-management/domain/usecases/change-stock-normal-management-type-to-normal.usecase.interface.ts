import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface ChangeStockNormalManagementTypeToNormalUsecaseInterface extends UsecaseInterface {
    execute(input: ChangeStockNormalManagementTypeToNormalUsecaseInterface.InputDto): Promise<ChangeStockNormalManagementTypeToNormalUsecaseInterface.OutputDto>
}

export namespace ChangeStockNormalManagementTypeToNormalUsecaseInterface {
    export type InputDto = {
        stockNormalManagementId: string
    }

    export type OutputDto = Either<Error[], null>
}