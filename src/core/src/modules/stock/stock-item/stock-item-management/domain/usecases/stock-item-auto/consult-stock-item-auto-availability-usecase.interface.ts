import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface ConsultStockItemAutoAvailabilityUsecaseInterface extends UsecaseInterface {
    execute(input: ConsultStockItemAutoAvailabilityUsecaseInterface.InputDto): Promise<ConsultStockItemAutoAvailabilityUsecaseInterface.OutputDto>
}

export namespace ConsultStockItemAutoAvailabilityUsecaseInterface {
    export type InputDto = {
        stockItemId: string
    }

    export type OutputDto = Either<Error[], number>
}