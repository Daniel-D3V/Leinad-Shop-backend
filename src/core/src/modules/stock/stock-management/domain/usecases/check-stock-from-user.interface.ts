import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface CheckStockFromUserUsecaseInterface extends UsecaseInterface {
    execute(input: CheckStockFromUserUsecaseInterface.InputDto): Promise<CheckStockFromUserUsecaseInterface.OutputDto>
}

export namespace CheckStockFromUserUsecaseInterface {
    export type InputDto = {
        productStockId: string
        userId: string
    }

    export type OutputDto = Either<Error[], null>
}