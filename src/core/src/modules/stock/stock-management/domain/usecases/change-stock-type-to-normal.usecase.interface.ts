import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface ChangeStockTypeToNormalUsecaseInterface extends UsecaseInterface {
    execute(input: ChangeStockTypeToNormalUsecaseInterface.InputDto): Promise<ChangeStockTypeToNormalUsecaseInterface.OutputDto>
}

export namespace ChangeStockTypeToNormalUsecaseInterface {
    export type InputDto = {
        stockManagementId: string
    }

    export type OutputDto = Either<Error[], null>
}