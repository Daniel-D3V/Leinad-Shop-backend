import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface DeleteStockAutoUsecaseInterface extends UsecaseInterface {
    execute(input: DeleteStockAutoUsecaseInterface.InputDto): Promise<DeleteStockAutoUsecaseInterface.OutputDto>
}

export namespace DeleteStockAutoUsecaseInterface {
    export type InputDto = {
        stockAutoId: string
    }

    export type OutputDto = Either<Error[], null>
}