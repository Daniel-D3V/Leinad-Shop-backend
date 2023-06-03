import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface DeleteStockItemAutoUsecaseInterface extends UsecaseInterface {
    execute(input: DeleteStockItemAutoUsecaseInterface.InputDto): Promise<DeleteStockItemAutoUsecaseInterface.OutputDto>
}

export namespace DeleteStockItemAutoUsecaseInterface {
    export type InputDto = {
        stockItemAutoId: string
    }

    export type OutputDto = Either<Error[], null>
}