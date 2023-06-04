import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface CreateStockManualUsecaseInterface extends UsecaseInterface {
    execute(input: CreateStockManualUsecaseInterface.InputDto): Promise<CreateStockManualUsecaseInterface.OutputDto>
}

export namespace CreateStockManualUsecaseInterface {
    export type InputDto = {
        stockManagementId: string
        stock: number
    }

    export type OutputDto = Either<Error[], null>
}