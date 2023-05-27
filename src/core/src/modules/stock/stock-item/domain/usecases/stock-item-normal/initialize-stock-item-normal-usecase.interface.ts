import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface InitializeStockItemNormalUsecaseInterface extends UsecaseInterface {
    execute(input: InitializeStockItemNormalUsecaseInterface.InputDto): Promise<InitializeStockItemNormalUsecaseInterface.OutputDto>
}

export namespace InitializeStockItemNormalUsecaseInterface {
    export type InputDto = {
        stockItemId: string
    }

    export type OutputDto = Either<Error[], {
        id: string
    }>
}