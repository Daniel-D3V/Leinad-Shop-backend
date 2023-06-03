import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface InitializeStockItemUsecaseInterface extends UsecaseInterface {
    execute(input: InitializeStockItemUsecaseInterface.InputDto): Promise<InitializeStockItemUsecaseInterface.OutputDto>
}

export namespace InitializeStockItemUsecaseInterface {
    export type InputDto = {
        announceItemId: string
    }

    export type OutputDto = Either<Error[], {
        id: string
    }>
}