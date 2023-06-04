import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface CheckStockAutoFromUserUsecaseInterface extends UsecaseInterface {
    execute(input: CheckStockAutoFromUserUsecaseInterface.InputDto): Promise<CheckStockAutoFromUserUsecaseInterface.OutputDto>
}

export namespace CheckStockAutoFromUserUsecaseInterface {
    export type InputDto = {
        productStockAutoId: string
        userId: string
    }

    export type OutputDto = Either<Error[], null>
}