import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface ChangeAnnounceInfoTitleUsecaseInterface extends UsecaseInterface {
    execute(data: ChangeAnnounceInfoTitleUsecaseInterface.InputDto): Promise<ChangeAnnounceInfoTitleUsecaseInterface.OutputDto>;
}

export namespace ChangeAnnounceInfoTitleUsecaseInterface {
    export type InputDto = {
        announceInfoId: string
        title: string
    }

    export type OutputDto = Either<Error[], null> 
}