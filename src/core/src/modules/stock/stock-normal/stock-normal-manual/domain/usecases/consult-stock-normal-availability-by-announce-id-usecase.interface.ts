import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface ConsultStockNormalAvailabilityByAnnounceIdUsecaseInterface extends UsecaseInterface {
    execute(input: ConsultStockNormalAvailabilityByAnnounceIdUsecaseInterface.InputDto): Promise<ConsultStockNormalAvailabilityByAnnounceIdUsecaseInterface.OutputDto>
}

export namespace ConsultStockNormalAvailabilityByAnnounceIdUsecaseInterface {
    export type InputDto = {
        announceId: string
    }

    export type OutputDto = Either<Error[], number>
}