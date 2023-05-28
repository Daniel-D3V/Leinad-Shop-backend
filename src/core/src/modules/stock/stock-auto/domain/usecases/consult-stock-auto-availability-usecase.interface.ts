import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface ConsultStockAutoAvailabilityUsecaseInterface extends UsecaseInterface {
    execute(input: ConsultStockAutoAvailabilityUsecaseInterface.InputDto): Promise<ConsultStockAutoAvailabilityUsecaseInterface.OutputDto>
}

export namespace ConsultStockAutoAvailabilityUsecaseInterface {
    export type InputDto = {
        announceId: string
    }

    export type OutputDto = Either<Error[], number>
}