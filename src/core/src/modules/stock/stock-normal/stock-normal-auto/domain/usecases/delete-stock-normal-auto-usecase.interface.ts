import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface DeleteStockNormalAutoUsecaseInterface extends UsecaseInterface {
    execute(input: DeleteStockNormalAutoUsecaseInterface.InputDto): Promise<DeleteStockNormalAutoUsecaseInterface.OutputDto>
}

export namespace DeleteStockNormalAutoUsecaseInterface {
    export type InputDto = {
        stockNormalAutoId: string
    }

    export type OutputDto = Either<Error[], null>
}