import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface CreateProductStockNormalUsecaseInterface extends UsecaseInterface {
    execute(input: CreateProductStockNormalUsecaseInterface.InputDto): Promise<CreateProductStockNormalUsecaseInterface.OutputDto>
}

export namespace CreateProductStockNormalUsecaseInterface {
    export type InputDto = {
        productStockId: string
    }

    export type OutputDto = Either<Error[], null>
}