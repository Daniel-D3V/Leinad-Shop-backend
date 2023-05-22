import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface CheckAnnounceFromUserUsecaseInterface extends UsecaseInterface {
    execute(input: CheckAnnounceFromUserUsecaseInterface.InputDto): Promise<CheckAnnounceFromUserUsecaseInterface.OutputDto>
}

export namespace CheckAnnounceFromUserUsecaseInterface {
    export type InputDto = {
        announceId: string
        userId: string
    }

    export type OutputDto = Either<Error[], null>
}