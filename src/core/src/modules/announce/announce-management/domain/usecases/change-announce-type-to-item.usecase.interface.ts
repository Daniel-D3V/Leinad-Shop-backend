
import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface ChangeAnnounceTypeToItemUsecaseInterface extends UsecaseInterface {
    execute(data: ChangeAnnounceTypeToItemUsecaseInterface.InputDto): Promise<ChangeAnnounceTypeToItemUsecaseInterface.OutputDto>;
}

export namespace ChangeAnnounceTypeToItemUsecaseInterface {
    export type InputDto = {
        announceId: string
    }

    export type OutputDto = Either<Error[], null> 
}