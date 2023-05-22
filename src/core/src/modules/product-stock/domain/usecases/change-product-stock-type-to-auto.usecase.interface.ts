import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface ChangeProductStockTypeToAutoUsecaseInterface extends UsecaseInterface {
    execute(input: ChangeProductStockTypeToAutoUsecaseInterface.InputDto): Promise<ChangeProductStockTypeToAutoUsecaseInterface.OutputDto>
}

export namespace ChangeProductStockTypeToAutoUsecaseInterface {
    export type InputDto = {
        productStockId: string
    }

    export type OutputDto = Either<Error[], null>
}