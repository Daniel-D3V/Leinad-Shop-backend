import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface ChangeStockItemTitleUsecaseInterface extends UsecaseInterface {
    execute(input: ChangeStockItemTitleUsecaseInterface.InputDto): Promise<ChangeStockItemTitleUsecaseInterface.OutputDto>
}

export namespace ChangeStockItemTitleUsecaseInterface {
    export type InputDto = {
        stockItemId: string
        title: string
    }

    export type OutputDto = Either<Error[], null>
}