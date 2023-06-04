import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface CreateStockNormalManualUsecaseInterface extends UsecaseInterface {
    execute(input: CreateStockNormalManualUsecaseInterface.InputDto): Promise<CreateStockNormalManualUsecaseInterface.OutputDto>
}

export namespace CreateStockNormalManualUsecaseInterface {
    export type InputDto = {
        stockNormalManagementId: string
        stock: number
    }

    export type OutputDto = Either<Error[], { id: string }>
}