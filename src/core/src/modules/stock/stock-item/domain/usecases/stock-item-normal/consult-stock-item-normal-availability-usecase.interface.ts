import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface ConsultStockItemNormalAvailabilityUsecaseInterface extends UsecaseInterface {
    execute(input: ConsultStockItemNormalAvailabilityUsecaseInterface.InputDto): Promise<ConsultStockItemNormalAvailabilityUsecaseInterface.OutputDto>
}

export namespace ConsultStockItemNormalAvailabilityUsecaseInterface {
    export type InputDto = {
        stockItemId: string
    }

    export type OutputDto = Either<Error[], number>
}