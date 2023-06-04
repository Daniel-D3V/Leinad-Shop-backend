import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface AddStockNormalAutoUsecaseInterface extends UsecaseInterface {
    execute(input: AddStockNormalAutoUsecaseInterface.InputDto): Promise<AddStockNormalAutoUsecaseInterface.OutputDto>
}

export namespace AddStockNormalAutoUsecaseInterface {
    export type InputDto = {
        stockNormalManagementId: string
        value: string
    }

    export type OutputDto = Either<Error[], {
        id: string
    }>
}