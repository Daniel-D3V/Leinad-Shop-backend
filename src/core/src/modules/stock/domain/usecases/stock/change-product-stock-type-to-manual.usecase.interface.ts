import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface ChangeProductStockTypeToManualUsecaseInterface extends UsecaseInterface {
    execute(input: ChangeProductStockTypeToManualUsecaseInterface.InputDto): Promise<ChangeProductStockTypeToManualUsecaseInterface.OutputDto>
}

export namespace ChangeProductStockTypeToManualUsecaseInterface {
    export type InputDto = {
        productStockId: string
    }

    export type OutputDto = Either<Error[], null>
}