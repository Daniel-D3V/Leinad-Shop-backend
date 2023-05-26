import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface AddAutoStockUsecaseInterface extends UsecaseInterface {
    execute(input: AddAutoStockUsecaseInterface.InputDto): Promise<AddAutoStockUsecaseInterface.OutputDto>
}

export namespace AddAutoStockUsecaseInterface {
    export type InputDto = {
        value: string
        productStockId: string
    }

    export type OutputDto = Either<Error[], {
        id: string
    }>
}