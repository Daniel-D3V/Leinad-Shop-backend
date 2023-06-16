import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface ActivateAnnounceUsecaseInterface extends UsecaseInterface {
    execute(data: ActivateAnnounceUsecaseInterface.InputDto): Promise<ActivateAnnounceUsecaseInterface.OutputDto>;
}

export namespace ActivateAnnounceUsecaseInterface {
    export type InputDto = {
        announceId: string
    }

    export type OutputDto = Either<Error[], null> 
}