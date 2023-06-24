import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface CreateStockItemManualUsecaseInterface extends UsecaseInterface {
    execute(input: CreateStockItemManualUsecaseInterface.InputDto): Promise<CreateStockItemManualUsecaseInterface.OutputDto>
}

export namespace CreateStockItemManualUsecaseInterface {
    export type InputDto = {
        announceItemId: string
        stock: number
    }

    export type OutputDto = Either<Error[], { id: string }>
}