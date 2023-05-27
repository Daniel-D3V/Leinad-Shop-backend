import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface CreateStockItemUsecaseInterface extends UsecaseInterface {
    execute(input: CreateStockItemUsecaseInterface.InputDto): Promise<CreateStockItemUsecaseInterface.OutputDto>
}

export namespace CreateStockItemUsecaseInterface {
    export type InputDto = {
        price: number
        announceId: string
    }

    export type OutputDto = Either<Error[], {
        id: string
    }>
}