import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface UpdateStockNormalManualUsecaseInterface extends UsecaseInterface {
    execute(input: UpdateStockNormalManualUsecaseInterface.InputDto): Promise<UpdateStockNormalManualUsecaseInterface.OutputDto>
}

export namespace UpdateStockNormalManualUsecaseInterface {
    export type InputDto = {
        stockNormalManualId: string
        stock: number
    }

    export type OutputDto = Either<Error[], null>
}