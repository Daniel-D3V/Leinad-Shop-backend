import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface UpdateNormalStockUsecaseInterface extends UsecaseInterface {
    execute(input: UpdateNormalStockUsecaseInterface.InputDto): Promise<UpdateNormalStockUsecaseInterface.OutputDto>
}

export namespace UpdateNormalStockUsecaseInterface {
    export type InputDto = {
        id: string
        newStock: number
    }

    export type OutputDto = Either<Error[], null>
}