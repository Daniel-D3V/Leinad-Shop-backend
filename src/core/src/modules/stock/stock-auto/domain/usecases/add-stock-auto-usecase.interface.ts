import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface AddStockAutoUsecaseInterface extends UsecaseInterface {
    execute(input: AddStockAutoUsecaseInterface.InputDto): Promise<AddStockAutoUsecaseInterface.OutputDto>
}

export namespace AddStockAutoUsecaseInterface {
    export type InputDto = {
        announceId: string
        value: string
    }

    export type OutputDto = Either<Error[], {
        id: string
    }>
}