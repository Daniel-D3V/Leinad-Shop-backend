import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface CreateStockManagementUsecaseInterface extends UsecaseInterface {
    execute(input: CreateStockManagementUsecaseInterface.InputDto): Promise<CreateStockManagementUsecaseInterface.OutputDto>
}

export namespace CreateStockManagementUsecaseInterface {
    export type InputDto = {
        announceId: string
    }

    export type OutputDto = Either<Error[], {
        id: string
    }>
}