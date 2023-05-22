import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface DeleteAutoStockUsecaseInterface extends UsecaseInterface {
    execute(input: DeleteAutoStockUsecaseInterface.InputDto): Promise<DeleteAutoStockUsecaseInterface.OutputDto>
}

export namespace DeleteAutoStockUsecaseInterface {
    export type InputDto = {
        productStockId: string
    }

    export type OutputDto = Either<Error[], null>
}