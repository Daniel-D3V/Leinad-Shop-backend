import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface ConsultStockItemAvailabilityUsecaseInterface extends UsecaseInterface {
    execute(input: ConsultStockItemAvailabilityUsecaseInterface.InputDto): Promise<ConsultStockItemAvailabilityUsecaseInterface.OutputDto>
}

export namespace ConsultStockItemAvailabilityUsecaseInterface {
    export type InputDto = {
        stockItemId: string
    }

    export type OutputDto = Either<Error[], number>
}