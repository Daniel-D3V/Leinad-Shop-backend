import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface InitializeStockNormalUsecaseInterface extends UsecaseInterface {
    execute(input: InitializeStockNormalUsecaseInterface.InputDto): Promise<InitializeStockNormalUsecaseInterface.OutputDto>
}

export namespace InitializeStockNormalUsecaseInterface {
    export type InputDto = {
        announceId: string
    }

    export type OutputDto = Either<Error[], null>
}