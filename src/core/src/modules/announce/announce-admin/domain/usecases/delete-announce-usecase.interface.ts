import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface DeleteAnnounceUsecaseInterface extends UsecaseInterface {
    execute(input: DeleteAnnounceUsecaseInterface.InputDto): Promise<DeleteAnnounceUsecaseInterface.OutputDto>
}

export namespace DeleteAnnounceUsecaseInterface {
    export type InputDto = {
        announceId: string
    }

    export type OutputDto = Either<Error[], null>
}