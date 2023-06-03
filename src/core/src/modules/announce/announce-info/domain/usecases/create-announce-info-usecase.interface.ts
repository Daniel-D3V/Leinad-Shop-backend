import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface CreateAnnounceInfoUsecaseInterface extends UsecaseInterface {
    execute(data: CreateAnnounceInfoUsecaseInterface.InputDto): Promise<CreateAnnounceInfoUsecaseInterface.OutputDto>;
}

export namespace CreateAnnounceInfoUsecaseInterface {
    export type InputDto = {
        announceId: string
        title: string
        description: string
    }

    export type OutputDto = Either<Error[], { id: string }> 
}