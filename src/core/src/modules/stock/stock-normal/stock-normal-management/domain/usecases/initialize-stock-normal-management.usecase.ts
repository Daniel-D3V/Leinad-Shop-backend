import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface InitializeStockNormalManagementUsecaseInterface extends UsecaseInterface {
    execute(input: InitializeStockNormalManagementUsecaseInterface.InputDto): Promise<InitializeStockNormalManagementUsecaseInterface.OutputDto>
}

export namespace InitializeStockNormalManagementUsecaseInterface {
    export type InputDto = {
        announceNormalId: string
    }

    export type OutputDto = Either<Error[], {
        id: string
    }>
}