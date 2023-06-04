import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface CreateStockItemManagementUsecaseInterface extends UsecaseInterface {
    execute(input: CreateStockItemManagementUsecaseInterface.InputDto): Promise<CreateStockItemManagementUsecaseInterface.OutputDto>
}

export namespace CreateStockItemManagementUsecaseInterface {
    export type InputDto = {
        announceItemId: string
    }

    export type OutputDto = Either<Error[], {
        id: string
    }>
}