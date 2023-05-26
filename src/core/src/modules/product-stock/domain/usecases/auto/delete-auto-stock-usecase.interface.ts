import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface DeleteAutoStockUsecaseInterface extends UsecaseInterface {
    execute(input: DeleteAutoStockUsecaseInterface.InputDto): Promise<DeleteAutoStockUsecaseInterface.OutputDto>
}

export namespace DeleteAutoStockUsecaseInterface {
    export type InputDto = {
        productStockAutoId: string
    }

    export type OutputDto = Either<Error[], null>
}