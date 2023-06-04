import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface ChangeStockNormalAutoValueUsecaseInterface extends UsecaseInterface {
    execute(input: ChangeStockNormalAutoValueUsecaseInterface.InputDto): Promise<ChangeStockNormalAutoValueUsecaseInterface.OutputDto>
}

export namespace ChangeStockNormalAutoValueUsecaseInterface {
    export type InputDto = {
        stockNormalAutoId: string
        value: string
    }

    export type OutputDto = Either<Error[], null>
}