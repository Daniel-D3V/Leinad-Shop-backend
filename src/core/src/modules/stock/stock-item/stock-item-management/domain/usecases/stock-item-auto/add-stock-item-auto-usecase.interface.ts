import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface AddStockItemAutoUsecaseInterface extends UsecaseInterface {
    execute(input: AddStockItemAutoUsecaseInterface.InputDto): Promise<AddStockItemAutoUsecaseInterface.OutputDto>
}

export namespace AddStockItemAutoUsecaseInterface {
    export type InputDto = {
        stockItemId: string
        value: string
    }

    export type OutputDto = Either<Error[], {
        id: string
    }>
}