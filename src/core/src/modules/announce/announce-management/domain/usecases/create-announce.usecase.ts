import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface CreateAnnounceUsecaseInterface extends UsecaseInterface {
    execute(data: CreateAnnounceUsecaseInterface.InputDto): Promise<CreateAnnounceUsecaseInterface.OutputDto>;
}

export namespace CreateAnnounceUsecaseInterface {
    export type InputDto = {
        userId: string
    }

    export type OutputDto = Either<Error[], { id: string }> 
}