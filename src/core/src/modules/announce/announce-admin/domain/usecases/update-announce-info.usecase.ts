import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface UpdateAnnounceInfoUsecaseInterface extends UsecaseInterface {
    execute(input: UpdateAnnounceInfoUsecaseInterface.InputDto): Promise<UpdateAnnounceInfoUsecaseInterface.OutputDto>
}

export namespace UpdateAnnounceInfoUsecaseInterface {
    export type InputDto = {
        announceId: string
        data: {
            title?: string
            description?: string
        }
    }

    export type OutputDto = Either<Error[], null>
}