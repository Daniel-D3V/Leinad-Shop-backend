import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface CreateStockNormalManagementUsecaseInterface extends UsecaseInterface {
    execute(input: CreateStockNormalManagementUsecaseInterface.InputDto): Promise<CreateStockNormalManagementUsecaseInterface.OutputDto>
}

export namespace CreateStockNormalManagementUsecaseInterface {
    export type InputDto = {
        announceNormalId: string
    }

    export type OutputDto = Either<Error[], {
        id: string
    }>
}