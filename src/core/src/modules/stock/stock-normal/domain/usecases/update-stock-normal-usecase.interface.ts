import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface UpdateStockNormalUsecaseInterface extends UsecaseInterface {
    execute(input: UpdateStockNormalUsecaseInterface.InputDto): Promise<UpdateStockNormalUsecaseInterface.OutputDto>
}

export namespace UpdateStockNormalUsecaseInterface {
    export type InputDto = {
        stockNormalId: string
        newStock: number
    }

    export type OutputDto = Either<Error[], null>
}