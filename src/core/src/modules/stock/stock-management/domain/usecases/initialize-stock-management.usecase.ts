import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface InitializeStockManagementUsecaseInterface extends UsecaseInterface {
    execute(input: InitializeStockManagementUsecaseInterface.InputDto): Promise<InitializeStockManagementUsecaseInterface.OutputDto>
}

export namespace InitializeStockManagementUsecaseInterface {
    export type InputDto = {
        announceId: string
    }

    export type OutputDto = Either<Error[], {
        id: string
    }>
}