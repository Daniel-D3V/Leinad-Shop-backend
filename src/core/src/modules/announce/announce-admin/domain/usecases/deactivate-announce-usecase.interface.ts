import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface DeactivateAnnounceUsecaseInterface extends UsecaseInterface {
    execute(input: DeactivateAnnounceUsecaseInterface.InputDto): Promise<DeactivateAnnounceUsecaseInterface.OutputDto>
}

export namespace DeactivateAnnounceUsecaseInterface {
    export type InputDto = {
        announceId: string
    }

    export type OutputDto = Either<Error[], null>
}