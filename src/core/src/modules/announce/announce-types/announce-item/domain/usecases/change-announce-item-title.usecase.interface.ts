import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface ChangeAnnounceItemTitleUsecaseInterface extends UsecaseInterface {
    execute(input: ChangeAnnounceItemTitleUsecaseInterface.InputDto): Promise<ChangeAnnounceItemTitleUsecaseInterface.OutputDto>
}

export namespace ChangeAnnounceItemTitleUsecaseInterface {
    export type InputDto = {
        announceItemId: string
        title: string
    }

    export type OutputDto = Either<Error[], null>
}