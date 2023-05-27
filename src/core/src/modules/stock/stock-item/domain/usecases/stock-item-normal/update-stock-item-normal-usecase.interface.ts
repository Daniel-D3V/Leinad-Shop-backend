import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface UpdateStockItemNormalUsecaseInterface extends UsecaseInterface {
    execute(input: UpdateStockItemNormalUsecaseInterface.InputDto): Promise<UpdateStockItemNormalUsecaseInterface.OutputDto>
}

export namespace UpdateStockItemNormalUsecaseInterface {
    export type InputDto = {
        stockItemNormalId: string
        stock: number
    }

    export type OutputDto = Either<Error[], null>
}