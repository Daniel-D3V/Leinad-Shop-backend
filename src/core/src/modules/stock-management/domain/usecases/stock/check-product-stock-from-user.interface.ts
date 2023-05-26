import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface CheckProductStockFromUserUsecaseInterface extends UsecaseInterface {
    execute(input: CheckProductStockFromUserUsecaseInterface.InputDto): Promise<CheckProductStockFromUserUsecaseInterface.OutputDto>
}

export namespace CheckProductStockFromUserUsecaseInterface {
    export type InputDto = {
        productStockId: string
        userId: string
    }

    export type OutputDto = Either<Error[], null>
}