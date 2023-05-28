import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface ConsultStockAvailabilityByAnnounceIdUsecaseInterface extends UsecaseInterface {
    execute(input: ConsultStockAvailabilityByAnnounceIdUsecaseInterface.InputDto): Promise<ConsultStockAvailabilityByAnnounceIdUsecaseInterface.OutputDto>
}

export namespace ConsultStockAvailabilityByAnnounceIdUsecaseInterface {
    export type InputDto = {
        announceId: string
    }

    export type OutputDto = Either<Error[], number>
}