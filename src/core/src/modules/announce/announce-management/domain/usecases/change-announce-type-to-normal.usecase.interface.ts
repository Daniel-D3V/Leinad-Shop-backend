

import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface ChangeAnnounceTypeToNormalUsecaseInterface extends UsecaseInterface {
    execute(data: ChangeAnnounceTypeToNormalUsecaseInterface.InputDto): Promise<ChangeAnnounceTypeToNormalUsecaseInterface.OutputDto>;
}

export namespace ChangeAnnounceTypeToNormalUsecaseInterface {
    export type InputDto = {
        announceId: string
    }

    export type OutputDto = Either<Error[], null> 
}