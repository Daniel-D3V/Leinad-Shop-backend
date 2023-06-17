import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface ChangeAnnounceInfoDescriptionUsecaseInterface extends UsecaseInterface {
    execute(data: ChangeAnnounceInfoDescriptionUsecaseInterface.InputDto): Promise<ChangeAnnounceInfoDescriptionUsecaseInterface.OutputDto>;
}

export namespace ChangeAnnounceInfoDescriptionUsecaseInterface {
    export type InputDto = {
        announceInfoId: string
        description: string
    }

    export type OutputDto = Either<Error[], null> 
}