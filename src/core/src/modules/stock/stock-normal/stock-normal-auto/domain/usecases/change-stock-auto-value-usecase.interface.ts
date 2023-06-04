import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface ChangeStockAutoValueUsecaseInterface extends UsecaseInterface {
    execute(input: ChangeStockAutoValueUsecaseInterface.InputDto): Promise<ChangeStockAutoValueUsecaseInterface.OutputDto>
}

export namespace ChangeStockAutoValueUsecaseInterface {
    export type InputDto = {
        stockAutoId: string
        value: string
    }

    export type OutputDto = Either<Error[], null>
}