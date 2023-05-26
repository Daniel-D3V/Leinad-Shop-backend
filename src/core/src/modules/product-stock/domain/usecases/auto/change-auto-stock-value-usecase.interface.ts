import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface ChangeAutoStockValueUsecaseInterface extends UsecaseInterface {
    execute(input: ChangeAutoStockValueUsecaseInterface.InputDto): Promise<ChangeAutoStockValueUsecaseInterface.OutputDto>
}

export namespace ChangeAutoStockValueUsecaseInterface {
    export type InputDto = {
        productStockAutoId: string
        value: string
    }

    export type OutputDto = Either<Error[], null>
}