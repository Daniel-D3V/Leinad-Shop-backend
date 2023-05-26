import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface CreateNormalStockUsecaseInterface extends UsecaseInterface {
    execute(input: CreateNormalStockUsecaseInterface.InputDto): Promise<CreateNormalStockUsecaseInterface.OutputDto>
}

export namespace CreateNormalStockUsecaseInterface {
    export type InputDto = {
        announceId: string
    }

    export type OutputDto = Either<Error[], null>
}